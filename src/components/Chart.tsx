const HeartCheckSolidIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}>
    <path
      fill="currentColor"
      d="M1 8.99836C1 5.35802 3.3947 2 7.43 2C9.30819 2 10.7026 2.8047 11.75 4.01046C12.7974 2.8047 14.1918 2 16.07 2C20.1053 2 22.5 5.35802 22.5 8.99836C22.5 9.46105 22.4685 9.91191 22.408 10.3511C22.3483 10.7843 22.231 11.2599 22.0514 11.7668C21.3153 11.6779 20.5472 11.9159 19.9822 12.4809L16.25 16.2131L16.0178 15.9809C15.0415 15.0045 13.4585 15.0045 12.4822 15.9809C11.5059 16.9572 11.5059 18.5401 12.4822 19.5164L13.5921 20.6262C13.2689 20.808 12.9356 20.9867 12.5922 21.1621C12.4224 21.2496 12.2535 21.3354 12.0855 21.4194C11.8743 21.525 11.6257 21.525 11.4145 21.4194C9.06793 20.2456 6.48346 18.718 4.47892 16.7123C2.46481 14.697 1 12.16 1 8.99836ZM22.4571 14.9557C22.8476 14.5652 22.8476 13.932 22.4571 13.5415C22.0666 13.151 21.4334 13.151 21.0429 13.5415L16.25 18.3344L14.9571 17.0415C14.5666 16.651 13.9334 16.651 13.5429 17.0415C13.1524 17.432 13.1524 18.0652 13.5429 18.4557L15.5429 20.4557C15.7304 20.6433 15.9848 20.7486 16.25 20.7486C16.5152 20.7486 16.7696 20.6433 16.9571 20.4557L22.4571 14.9557Z"></path>
  </svg>
);

import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Icon,
  IconButton,
  Spacer,
  VStack,
  type CenterProps,
} from "@chakra-ui/react";
import { useDoubleTap, useLayout } from "@hooks";
import { DATA_NAME, PRIMARY_COLOR } from "@shared/constants";
import type { TChart, TMetadata } from "@shared/models";
import { getKoreanVegaLite, getMainSpec } from "@shared/utils";
import { useDataStore, useSessionsStore } from "@stores";
import { HeartAddIcon } from "hugeicons-react";
import { memo, useMemo, useState, type SVGProps } from "react";
import { useTranslation } from "react-i18next";
import { Error as VegaError, type TimeUnit } from "vega";
import type { TopLevelSpec } from "vega-lite";
import CachedVegaLite from "./CachedVegaLite";
import ChartTitle from "./ChartTitle";

interface ChartProps extends CenterProps {
  chart: TChart;
}

const timeFormats: Partial<Record<TimeUnit, string>> = {
  year: "%Y",
  month: "%b",
  day: "%a",
  hours: "%H",
};

interface TemporalConfig {
  timeUnit: TimeUnit | undefined;
  timeUnits: TimeUnit[];
  setTimeUnit: (unit: TimeUnit) => void;
}

function useTemporalConfig(temporalField: TChart["fields"][number] | undefined): TemporalConfig {
  const temporalMetadata = temporalField?.metadata;

  const timeUnitUniques =
    temporalMetadata && temporalMetadata.type === "datetime"
      ? [
          temporalMetadata.yearUnique,
          temporalMetadata.monthUnique,
          temporalMetadata.dayUnique,
          temporalMetadata.hoursUnique,
        ]
      : [];

  const argMaxTimeUnit = timeUnitUniques.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);

  const timeUnits = ["year", "month", "day", "hours"].filter(
    (unit) => ((temporalMetadata?.[`${unit}Unique` as keyof TMetadata] as number) ?? 0) > 1,
  ) as TimeUnit[];

  const [timeUnit, setTimeUnit] = useState<TimeUnit | undefined>(() => {
    if (timeUnits.length === 0) return undefined;
    return timeUnits[argMaxTimeUnit];
  });

  return {
    timeUnit,
    timeUnits,
    setTimeUnit,
  };
}

function getTemporalSpec(
  mainSpec: TopLevelSpec,
  timeUnit: TimeUnit,
  temporalField: { name: string },
): TopLevelSpec {
  return {
    ...mainSpec,
    config: {
      ...mainSpec.config,
      axisTemporal: {
        format: timeFormats[timeUnit],
      },
    },
    transform: [
      {
        timeUnit,
        field: temporalField.name,
        as: temporalField.name,
      },
    ],
  };
}
function Chart({ chart, ...props }: ChartProps) {
  const { mobile, chartTheme, chartWidth, chartHeight } = useLayout();
  const { i18n } = useTranslation();
  const _data = useDataStore((state) => state.data);
  const setChartPreferred = useSessionsStore((state) => state.setChartPreferred);
  const setChartTimeUnit = useSessionsStore((state) => state.setChartTimeUnit);

  const temporalField = chart.fields.find((field) => field.type === "datetime");
  const { timeUnit, timeUnits, setTimeUnit } = useTemporalConfig(temporalField);

  const data = useMemo(() => ({ [DATA_NAME]: _data }), [_data]);
  const spec = useMemo(() => {
    let mainSpec = getMainSpec(chart.spec, chartWidth, chartHeight);

    if (temporalField && timeUnit) {
      setChartTimeUnit(chart.key, timeUnit);
      mainSpec = getTemporalSpec(mainSpec, timeUnit, temporalField);
    }
    return i18n.language === "ko" ? getKoreanVegaLite(mainSpec) : mainSpec;
  }, [
    chart.spec,
    chart.key,
    chartWidth,
    chartHeight,
    temporalField,
    timeUnit,
    setChartTimeUnit,
    i18n.language,
  ]);

  const currentChartPreferred = chart.preferred;

  const handlePreferChart = () => {
    if (!chart.key) return;
    setChartPreferred(chart.key, !currentChartPreferred);
  };

  const handlers = useDoubleTap(handlePreferChart);

  return (
    <Center flexDir={"column"} {...handlers} {...props}>
      <VStack>
        <ChartTitle chart={chart} textAlign={"center"} fontSize={"lg"} />
        <CachedVegaLite
          width={chartWidth}
          height={chartHeight}
          spec={spec}
          data={data}
          theme={chartTheme}
          actions={false}
          logLevel={VegaError}
        />
      </VStack>
      {timeUnit && (
        <ButtonGroup gap={0} w="full" my={4} spacing={0}>
          {timeUnits.map((unit, i) => (
            <Button
              borderLeftRadius={i === 0 ? "lg" : 0}
              borderLeft={i === 0 ? "lg" : 0}
              borderRightRadius={i === timeUnits.length - 1 ? "lg" : 0}
              variant={timeUnit === unit ? "solid" : "outline"}
              m={0}
              key={`temporal-select-${unit}`}
              colorScheme={PRIMARY_COLOR}
              size={"md"}
              onClick={() => setTimeUnit(unit)}
              w="full">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      )}

      {mobile && (
        <>
          <Spacer />
          <Flex justifyContent={"flex-end"} w="full">
            <IconButton
              variant={"ghost"}
              icon={
                <Icon
                  as={currentChartPreferred ? HeartCheckSolidIcon : HeartAddIcon}
                  boxSize={10}
                />
              }
              py={8}
              size="lg"
              aria-label="Bookmark current chart"
              onClick={handlePreferChart}
              data-log-click="prefer-chart"
              colorScheme={currentChartPreferred ? "red" : "gray"}
            />
          </Flex>
        </>
      )}
    </Center>
  );
}

export default memo(Chart);
