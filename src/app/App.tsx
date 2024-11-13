import { Flex, Spacer } from "@chakra-ui/react";
import {
  Bookmarks,
  Browser,
  ChartPanel,
  Controller,
  Fields,
  ScrollIndicator,
  Settings,
  TabsContainer,
} from "@components";
import { useLayout, useStoresLogging } from "@hooks";
import {
  ChartIcon,
  HeartCheckIcon,
  ProfileIcon,
  Search01Icon,
  Settings01Icon,
} from "hugeicons-react";
import { useTranslation } from "react-i18next";

export default function App() {
  const { cardHeight, cardColor, cardWidth, mobile, borderColor } = useLayout();
  const { t } = useTranslation();
  useStoresLogging();

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      maxH={cardHeight}
      gap={4}
      flexDir={{ base: "column", lg: "row" }}>
      <Flex position="relative" w={cardWidth} h={cardHeight}>
        <ScrollIndicator
          top={mobile ? 0 : undefined}
          bottom={mobile ? undefined : 0}
          h={8}
          p={2}
          w="full"
        />
        <ChartPanel
          w={"full"}
          gap={{ base: 0, lg: 4 }}
          orientation={mobile ? "vertical" : "horizontal"}
        />
      </Flex>
      <Flex
        position={mobile ? "fixed" : "relative"}
        borderTop={mobile ? "1px solid" : "none"}
        borderColor={borderColor}
        bottom={0}
        px={4}
        pb={mobile ? 8 : 2}
        flexDir={"column"}
        bgColor={cardColor}
        borderRadius={"lg"}
        w={{ base: "full", lg: "sm" }}
        minW={{ base: "full", lg: "sm" }}>
        <TabsContainer // tabs추가하면 src/stores/useInteractionStore.ts에도 반영해야함
          flexDir={mobile ? "column-reverse" : "column"}
          variant={mobile ? "soft-rounded" : "line"}
          tabs={[
            {
              name: "likes",
              displayName: t("bookmarks.title"),
              icon: HeartCheckIcon,
              Panel: <Bookmarks p={0} m={0} gap={2} w="full" />,
              displayingBeforeInit: false,
            },
            {
              name: "search",
              displayName: t("search.title"),
              icon: Search01Icon,
              Panel: <Browser />,
              displayingBeforeInit: false,
            },
            {
              name: "charts",
              displayName: t("charts.title"),
              icon: ChartIcon,
              Panel: null,
              displayingBeforeInit: false,
            },
            {
              name: "fields",
              displayName: t("fields.title"),
              icon: ProfileIcon,
              Panel: <Fields />,
              displayingBeforeInit: false,
            },
            {
              name: "settings",
              displayName: t("settings.title"),
              icon: Settings01Icon,
              Panel: <Settings align={"start"} py={4} />,
              displayingBeforeInit: true,
            },
          ]}
        />
        <Spacer />
        {!mobile && <Controller spacing={2} w={"full"} />}
      </Flex>
    </Flex>
  );
}
