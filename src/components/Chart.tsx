import {
  Card,
  type CenterProps,
  Flex,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import type { ChartModel } from "@shared/models";
import { memo } from "react";
import { Vega } from "react-vega";

interface ChartProps extends CenterProps {
  chart: ChartModel;
  chartWidth: Partial<Record<string, number>> | (number | null)[];
  chartHeight: Partial<Record<string, number>> | (number | null)[];
}

function Chart({ chart, chartWidth, chartHeight, ...props }: ChartProps) {
  const width = useBreakpointValue(chartWidth);
  const height = useBreakpointValue(chartHeight);
  const { colorMode } = useColorMode();
  return (
    <Flex as={Card} {...props}>
      <Heading>{chart.title}</Heading>
      <Vega
        spec={{
          ...chart.spec,
          width,
          height,
          background: "transparent",
        }}
        theme={colorMode === "dark" ? "dark" : undefined}
        actions={false}
        renderer="canvas"
      />
    </Flex>
  );
}

export default memo(Chart);
