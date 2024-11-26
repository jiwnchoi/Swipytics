/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { chakraColors, PRIMARY } from "@shared/constants";
import { useLayoutEffect, useRef } from "react";

export default function useLayout() {
  const bgColor = useColorModeValue("#EDF2F7", "#1A202C");

  useLayoutEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]") as HTMLMetaElement;
    const msApplicationNavButtonColor = document.querySelector(
      "meta[name=msapplication-navbutton-color]",
    ) as HTMLMetaElement;
    metaThemeColor.content = bgColor;
    msApplicationNavButtonColor.content = bgColor;
  }, [bgColor]);

  const cardPadding = useBreakpointValue({
    base: 4,
    lg: 0,
  })!;
  const viewPadding = 2;
  const cardRef = useRef<HTMLDivElement>(null);

  const cardWidth = useBreakpointValue({ base: window.innerWidth - 2 * viewPadding * 4, lg: 880 })!;
  const cardHeight = useBreakpointValue({
    base: window.innerHeight - 150,
    lg: window.innerHeight * 0.8 - 18,
  })!;

  const [chartWidth, chartHeight] = useBreakpointValue({
    base: [window.innerWidth - 64, Math.min(window.innerHeight - 380, 500)],
    lg: [Math.min(window.innerWidth - 250, 600), Math.min(window.innerHeight - 250, 600)],
  }) ?? [300, 300];

  const cardInnerWidth = cardWidth - 2 * cardPadding * 4;
  const cardInnerHeight = cardHeight - 2 * cardPadding * 4;

  const mobile = useBreakpointValue({ base: true, lg: false });
  const drawerBgColor = useColorModeValue(chakraColors.white, chakraColors["gray.900"]);
  const cardColor = useColorModeValue(chakraColors.white, chakraColors["gray.900"]);
  const borderColor = useColorModeValue(chakraColors["gray.200"], chakraColors["gray.700"]);

  const tabPanelHeight = useBreakpointValue({
    base: "calc(100dvh - 110px)",
    lg: window.innerHeight * 0.8 - 200,
  });
  const tabIconSize = 5;

  const thumbnailSize = "70px";

  const buttonColor = useColorModeValue(chakraColors["gray.100"], chakraColors["gray.800"]);

  const accentColor = useColorModeValue(PRIMARY[600], PRIMARY[300]);
  const accentHoverColor = useColorModeValue(PRIMARY[500], PRIMARY[400]);

  const preferredColor = useColorModeValue(chakraColors["red.500"], chakraColors["red.200"]);

  const accentSelected = useColorModeValue(chakraColors["orange.50"], chakraColors["orange.800"]);
  const accentSelectedHover = useColorModeValue(
    chakraColors["orange.600"],
    chakraColors["orange.200"],
  );
  const defaultGrayColor = useColorModeValue(chakraColors["gray.400"], chakraColors["gray.600"]);
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
  const chartTheme: "dark" | undefined = useColorModeValue(undefined, "dark");
  const indicatorPadding = {
    TOP: 24,
    BOTTOM: 24,
  };

  const indicatorGap = 6;

  return {
    cardRef,
    cardInnerHeight,
    cardInnerWidth,
    indicatorGap,
    chartTheme,
    indicatorPadding,
    chartHeight,
    chartWidth,

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
    defaultGrayColor,
    thumbnailSize,
    mobile,
    scrollbarStyle,
    accentSelected,
    accentSelectedHover,
  };
}
