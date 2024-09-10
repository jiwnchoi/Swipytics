import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

export default function useColors() {
  const cardPadding = useBreakpointValue({ base: 0, lg: "18px" });
  const cardWidth = useBreakpointValue({ base: window.innerWidth, lg: "full" });
  const cardHeight = useBreakpointValue({
    base: "100vh",
    lg: "calc(80vh - 18px)",
  });
  const cardColor = useColorModeValue("white", "gray.900");
  const mobile = useBreakpointValue({ base: true, lg: false });
  const drawerBgColor = useColorModeValue("gray.100", "gray.800");

  const tabPanelHeight = useBreakpointValue({ base: 320, lg: 600 });
  const tabIconSize = 5;
  const thumbnailSize = 50;
  return {
    cardPadding,
    tabIconSize,
    cardWidth,
    cardHeight,
    cardColor,
    mobile,
    drawerBgColor,
    tabPanelHeight,
    thumbnailSize,
  };
}
