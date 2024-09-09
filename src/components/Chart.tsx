import { Center, type CenterProps, Flex, Heading } from "@chakra-ui/react";
import { useChart } from "@hooks";
import type { TChart } from "@shared/models";
import { memo } from "react";
import { VegaLite } from "react-vega";
import { Error as VegaError } from "vega";

interface ChartProps extends CenterProps {
  chart: TChart;
}

function Chart({ chart, ...props }: ChartProps) {
  const { data, chartTheme, spec } = useChart(chart);
  return (
    <Center maxW={"800px"} scrollSnapAlign={"start"} {...props}>
      <Heading>{chart.title}</Heading>
      <VegaLite
        spec={spec}
        data={data}
        theme={chartTheme}
        actions={false}
        renderer="canvas"
        logLevel={VegaError}
      />
      <Flex minH={{ base: "300px", lg: "0px" }} />
    </Center>
  );
}

export default memo(Chart);
