import {
  Center,
  type CenterProps,
  Flex,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import type { TChart } from "@shared/models";
import { useDataStore } from "@stores";
import useMeasure from "react-use-measure";
import { VegaLite, type VisualizationSpec } from "react-vega";

interface ChartProps extends CenterProps {
  chart: TChart;
}

function Chart({ chart, ...props }: ChartProps) {
  const [boxRef, boxBounds] = useMeasure();
  const { colorMode } = useColorMode();
  const data = useDataStore(state => state.data);
  const deviceSize = Math.min(window.innerWidth, window.innerHeight);

  const [width, height] = useBreakpointValue({
    base: [deviceSize - 32, deviceSize - 32],
    lg: [boxBounds.width - 100, boxBounds.height - 100],
  }) ?? [0, 0];
  return (
    <Center minW="full" scrollSnapAlign={"start"} ref={boxRef} {...props}>
      <Heading>{chart.title}</Heading>
      <VegaLite
        spec={
          {
            ...chart.specs[0],
            width,
            height,
            background: "transparent",
            data: { name: "table" },
            config: {
              ...chart.specs[0].config,
              axis: {
                labelFontSize: 14,
                titleFontSize: 16,
                titlePadding: 16,
              },
              autosize: {
                type: "fit",
              },
            },
          } as VisualizationSpec
        }
        data={{ table: data }}
        theme={colorMode === "dark" ? "dark" : undefined}
        actions={false}
        renderer="canvas"
      />
      <Flex minH={{ base: "85px", lg: "0px" }} />
    </Center>
  );
}

export default Chart;
