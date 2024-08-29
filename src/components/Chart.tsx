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
import { VegaLite, type VisualizationSpec } from "react-vega";

interface ChartProps extends CenterProps {
  chart: TChart;
}

function Chart({ chart, ...props }: ChartProps) {
  const size = useBreakpointValue({
    base: 300,
    lg: 550,
  });
  const { colorMode } = useColorMode();
  const data = useDataStore(state => state.data);
  return (
    <Flex minW="full" scrollSnapAlign={"start"} {...props}>
      <Card
        w="full"
        h="full"
        alignItems={"center"}
        justify={"center"}
        rounded={{ base: "none", md: "md" }}
        p={4}
        gap={4}>
        <Heading>{chart.title}</Heading>
        <VegaLite
          spec={
            {
              ...chart.specs[0],
              width: size,
              height: size,
              background: "transparent",
              data: { name: "table" },
              config: {
                ...chart.specs[0].config,
                axis: {
                  labelFontSize: 14,
                  titleFontSize: 16,
                  titlePadding: 16,
                },
              },
            } as VisualizationSpec
          }
          data={{ table: data }}
          theme={colorMode === "dark" ? "dark" : undefined}
          actions={false}
          renderer="canvas"
        />
        <Flex minH={{ base: "200px", lg: "0px" }} />
      </Card>
    </Flex>
  );
}

export default Chart;
