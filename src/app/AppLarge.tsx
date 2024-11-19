import { Flex, Spacer } from "@chakra-ui/react";
import { Controller, ScrollIndicator, Settings, TabsContainer } from "@components";
import { useLayout } from "@hooks";
import { DiscoverView, LikesView, SessionView } from "@views";
import { HeartCheckIcon, Search01Icon, Settings01Icon } from "hugeicons-react";
import { useTranslation } from "react-i18next";

export default function LargeApp() {
  const { cardHeight, cardColor, cardWidth, borderColor, tabPanelHeight } = useLayout();
  const { t } = useTranslation();

  return (
    <Flex minW="container.xl" maxH={cardHeight} gap={4} flexDir="row">
      <Flex position="relative" w={cardWidth} h={cardHeight}>
        <ScrollIndicator left={0} top={12} w={8} h={cardHeight} />
        <SessionView w="full" gap={4} orientation="vertical" />
      </Flex>
      <Flex
        position="relative"
        borderTop="none"
        borderColor={borderColor}
        px={4}
        py={2}
        flexDir="column"
        bgColor={cardColor}
        borderRadius="lg"
        w="sm"
        minW="sm">
        <TabsContainer
          flexDir="column"
          variant="line"
          tabs={[
            {
              name: "likes",
              displayName: t("bookmarks.title"),
              icon: HeartCheckIcon,
              Panel: <LikesView h={tabPanelHeight} thumbnailSize={100} />,
              displayingBeforeInit: false,
            },
            {
              name: "search",
              displayName: t("search.title"),
              icon: Search01Icon,
              Panel: <DiscoverView tagSize="md" h={tabPanelHeight} pb={4} thumbnailSize={80} />,
              displayingBeforeInit: false,
            },
            {
              name: "settings",
              displayName: t("settings.title"),
              icon: Settings01Icon,
              Panel: <Settings h={tabPanelHeight} align="start" py={4} />,
              displayingBeforeInit: true,
            },
          ]}
        />
        <Spacer />
        <Controller spacing={2} w="full" />
      </Flex>
    </Flex>
  );
}
