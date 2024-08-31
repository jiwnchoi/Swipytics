import { useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { useDataStore } from "@stores";

export default function useChart() {
  const { colorMode } = useColorMode();
  const data = useDataStore(state => state.data);

  const chartTheme: "dark" | undefined = colorMode === "dark" ? "dark" : undefined;
  const [width, height] = useBreakpointValue({
    base: [300, 300],
    lg: [600, 600],
  }) ?? [300, 300];

  //

  return { data, width, height, chartTheme };
}
