import {
  Box,
  Center,
  type CenterProps,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useChart, useDoubleTap, useLayout } from "@hooks";
import type { TChart } from "@shared/models";
import { useSessionsStore } from "@stores";
import { HeartAddIcon, HeartCheckIcon } from "hugeicons-react";
import { memo } from "react";
import { VegaLite } from "react-vega";
import { Error as VegaError } from "vega";

interface ChartProps extends CenterProps {
  chart: TChart;
}

function Chart({ chart, ...props }: ChartProps) {
  const { data, chartTheme, spec } = useChart(chart);
  const currentChartPreferred = chart.preferred;
  const setChartPreferred = useSessionsStore((state) => state.setChartPreferred);
  const { mobile } = useLayout();

  const handlePreferChart = () => {
    if (!chart.key) return;
    setChartPreferred(chart.key, !currentChartPreferred);
  };

  const handlers = useDoubleTap(handlePreferChart);

  return (
    <Center
      p={6}
      flexDir={"column"}
      maxW={"800px"}
      scrollSnapAlign={"start"}
      {...handlers}
      {...props}>
      <Box>
        <Heading fontSize={18} mb={4} textAlign={"center"}>
          {chart.title}
        </Heading>
        <VegaLite spec={spec} data={data} theme={chartTheme} actions={false} logLevel={VegaError} />
      </Box>

      {mobile && (
        <>
          <Spacer />
          <Flex justifyContent={"flex-end"} w="full">
            <IconButton
              variant={"ghost"}
              icon={<Icon as={currentChartPreferred ? HeartCheckIcon : HeartAddIcon} boxSize={6} />}
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
