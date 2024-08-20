import {
  type CenterProps,
  Flex,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { Vega, type VisualizationSpec } from "react-vega";

interface ChartProps extends CenterProps {
  spec: ObjectWithKey<VisualizationSpec>;
  chartWidth: Partial<Record<string, number>> | (number | null)[];
  chartHeight: Partial<Record<string, number>> | (number | null)[];
}

function Chart({ spec, chartWidth, chartHeight, ...props }: ChartProps) {
  const width = useBreakpointValue(chartWidth);
  const height = useBreakpointValue(chartHeight);
  const { colorMode } = useColorMode();
  return (
    <Flex {...props}>
      <Heading>{spec.key}</Heading>
      <Vega
        spec={{
          ...spec,
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

export default Chart;
