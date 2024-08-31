import { Center, type CenterProps, Flex, Heading } from "@chakra-ui/react";
import useChart from "@hooks/useChart";
import type { TChart } from "@shared/models";
import { VegaLite, type VisualizationSpec } from "react-vega";

interface ChartProps extends CenterProps {
  chart: TChart;
}

function Chart({ chart, ...props }: ChartProps) {
  const { boxRef, data, width, height, chartTheme } = useChart();
  return (
    <Center minW="full" scrollSnapAlign={"start"} ref={boxRef} {...props}>
      <Heading>{chart.title}</Heading>
      <VegaLite
        spec={
          {
            ...chart.specs[0],
            width,
            height: height,
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
        theme={chartTheme}
        actions={false}
        renderer="canvas"
      />
      <Flex minH={{ base: "85px", lg: "0px" }} />
    </Center>
  );
}

export default Chart;
