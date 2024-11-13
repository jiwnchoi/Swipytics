import { Button, type CenterProps, Flex, Icon, VStack } from "@chakra-ui/react";
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
    <Flex
      px={4}
      pt={16}
      pb={32}
      flexDir={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      maxW={"800px"}
      scrollSnapAlign={"start"}
      {...handlers}
      {...props}>
      <VegaLite
        spec={spec}
        data={data}
        theme={chartTheme}
        actions={false}
        logLevel={VegaError}
        // tooltip={new Handler().call}
      />
      {!!mobile && (
        <Flex justifyContent={"flex-end"} w="full">
          <Button
            borderRadius={"50%"}
            py={8}
            size="lg"
            aria-label="Bookmark current chart"
            onClick={handlePreferChart}
            data-log-click="prefer-chart"
            colorScheme={currentChartPreferred ? "red" : "gray"}
            variant={currentChartPreferred ? "solid" : "ghost"}>
            <VStack spacing={2}>
              <Icon as={currentChartPreferred ? HeartCheckIcon : HeartAddIcon} boxSize={6} />
            </VStack>
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default memo(Chart);
