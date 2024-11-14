import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { chakraColors, PRIMARY } from "@shared/constants";

export default function useColors() {
  const cardPadding = useBreakpointValue({ base: 0, lg: "18px" });
  const cardWidth = useBreakpointValue({ base: "full", lg: 880 });
  const cardHeight = useBreakpointValue({
    base: "calc(100dvh - 140px)",
    lg: "calc(80dvh - 18px)",
  })!;
  const mobile = useBreakpointValue({ base: true, lg: false });
  const drawerBgColor = useColorModeValue(chakraColors.white, chakraColors["gray.900"]);
  const cardColor = useColorModeValue(chakraColors.white, chakraColors["gray.900"]);
  const borderColor = useColorModeValue(chakraColors["gray.200"], chakraColors["gray.700"]);

  const tabPanelHeight = useBreakpointValue({ base: "calc(100dvh - 110px)", lg: 560 });
  const tabIconSize = 5;

  const thumbnailSize = "70px";

  const buttonColor = useColorModeValue(chakraColors["gray.100"], chakraColors["gray.800"]);

  const accentColor = useColorModeValue(PRIMARY[600], PRIMARY[300]);
  const accentHoverColor = useColorModeValue(PRIMARY[500], PRIMARY[400]);

  const preferredColor = useColorModeValue(chakraColors["red.500"], chakraColors["red.200"]);

  const accentSelected = useColorModeValue(chakraColors["orange.50"], chakraColors["orange.800"]);
  const accentSelectedHover = useColorModeValue(
    chakraColors["orange.100"],
    chakraColors["orange.700"],
  );

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
    borderColor,
    preferredColor,
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
    accentSelected,
    accentSelectedHover,
  };
}
