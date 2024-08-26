import {
  Card,
  type CenterProps,
  Flex,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import type { TChart } from "@shared/models";
import { useDataStore } from "@stores";
import { memo } from "react";
import { VegaLite, type VisualizationSpec } from "react-vega";

interface ChartProps extends CenterProps {
  chart: TChart;
  chartWidth: Partial<Record<string, number>> | (number | null)[];
  chartHeight: Partial<Record<string, number>> | (number | null)[];
}

function Chart({ chart, chartWidth, chartHeight, ...props }: ChartProps) {
  const width = useBreakpointValue(chartWidth);
  const height = useBreakpointValue(chartHeight);
  const { colorMode } = useColorMode();
  const data = useDataStore(state => state.data);
  return (
    <Flex minW="full" scrollSnapAlign={"start"} {...props}>
      <Card
        w="full"
        h="full"
        alignItems={"center"}
        rounded={{ base: "none", md: "md" }}
        p={4}
        gap={4}>
        <Heading>{chart.title}</Heading>
        <VegaLite
          spec={
            {
              ...chart.specs[0],
              width,
              height,
              background: "transparent",
              data: { name: "table" },
            } as VisualizationSpec
          }
          data={{ table: data }}
          theme={colorMode === "dark" ? "dark" : undefined}
          actions={false}
          renderer="canvas"
        />
      </Card>
    </Flex>
  );
}

export default memo(Chart);
