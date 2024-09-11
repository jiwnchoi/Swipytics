import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { PRIMARY } from "@shared/constants";

export default function useColors() {
  const cardPadding = useBreakpointValue({ base: 0, lg: "18px" });
  const cardWidth = useBreakpointValue({ base: window.innerWidth, lg: 880 });
  const cardHeight = useBreakpointValue({
    base: "100vh",
    lg: "calc(80vh - 18px)",
  });
  const cardColor = useColorModeValue("white", "gray.900");
  const mobile = useBreakpointValue({ base: true, lg: false });
  const drawerBgColor = useColorModeValue("white", "gray.900");

  const tabPanelHeight = useBreakpointValue({ base: 320, lg: 600 });
  const tabIconSize = 5;

  const thumbnailSize = 50;

  const buttonColor = useColorModeValue("gray.100", "gray.800");

  const accentColor = useColorModeValue(`${PRIMARY[500]}`, `${PRIMARY[400]}`);
  const accentHoverColor = useColorModeValue(`${PRIMARY[600]}`, `${PRIMARY[300]}`);

  const scrollbarStyle = {
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: accentColor,
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: accentHoverColor,
    },
  };
  return {
    accentColor,
    accentHoverColor,
    buttonColor,
    cardPadding,
    cardWidth,
    cardHeight,
    cardColor,
    drawerBgColor,
    tabPanelHeight,
    tabIconSize,
    thumbnailSize,
    mobile,
    scrollbarStyle,
  };
}
