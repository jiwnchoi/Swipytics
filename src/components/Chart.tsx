import { type CenterProps, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { memo } from "react";
import { Vega, type VisualizationSpec } from "react-vega";

interface ChartProps extends CenterProps {
  spec: VisualizationSpec;
  chartWidth: Partial<Record<string, number>> | (number | null)[];
  chartHeight: Partial<Record<string, number>> | (number | null)[];
}

function Chart({ spec, chartWidth, chartHeight, ...props }: ChartProps) {
  const width = useBreakpointValue(chartWidth);
  const height = useBreakpointValue(chartHeight);
  return (
    <Flex {...props}>
      <Heading>{spec.key}</Heading>
      <Vega
        spec={{
          ...spec,
          width,
          height,
        }}
        actions={false}
        renderer="canvas"
      />
    </Flex>
  );
}

const MemoChart = memo(Chart);
export default MemoChart;
