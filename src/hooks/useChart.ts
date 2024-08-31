import { useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { useDataStore } from "@stores";
import useMeasure from "react-use-measure";

export default function useChart() {
  const [boxRef, boxBounds] = useMeasure();
  const { colorMode } = useColorMode();
  const data = useDataStore(state => state.data);
  const deviceSize = Math.min(window.innerWidth, window.innerHeight);
  const chartTheme: "dark" | undefined = colorMode === "dark" ? "dark" : undefined;

  const [width, height] = useBreakpointValue({
    base: [deviceSize - 32, deviceSize - 32],
    lg: [boxBounds.width - 100, boxBounds.height - 100],
  }) ?? [0, 0];

  return { boxRef, data, width, height, chartTheme };
}
