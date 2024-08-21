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
    <Flex minW="full" scrollSnapAlign={"start"} {...props}>
      <Card
        w="full"
        h="full"
        alignItems={"center"}
        rounded={{ base: "none", md: "md" }}
        p={4}
        gap={4}>
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
      </Card>
    </Flex>
  );
}

export default memo(Chart);
