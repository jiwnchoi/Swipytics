import { Flex, Heading, Icon, IconButton, Spacer } from "@chakra-ui/react";
import { PlaceHolder, Settings, TabsContainerBase } from "@components";
import { useLayout } from "@hooks";
import { useInteractionStore, useSessionsStore } from "@stores";
import { DiscoverView, LikesView, SessionView } from "@views";
import {
  ChartIcon,
  HeartCheckIcon,
  Search02Icon,
  Settings01Icon,
  SwipeUp02Icon,
} from "hugeicons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const Header = memo(HeaderImpl);

function HeaderImpl() {
  const { accentColor } = useLayout();
  const tabIndex = useInteractionStore((state) => state.tabIndex);
  const setTabByName = useInteractionStore((state) => state.setTabByName);
  const { t } = useTranslation();
  const fields = useSessionsStore((state) => state.fields);

  return (
    <Flex w="full" justifyContent={"space-between"} alignItems={"center"} px={2} py={1}>
      {tabIndex !== -1 ? (
        <Flex alignItems={"center"} h="full" gap={1}>
          <Icon as={SwipeUp02Icon} boxSize={7} />
          <Heading size={"md"}>Swipytics</Heading>
        </Flex>
      ) : (
        <Flex />
      )}
      <IconButton
        variant={"ghost"}
        padding={0}
        isDisabled={fields.length === 0}
        color={tabIndex === -1 ? accentColor : undefined}
        icon={<Icon as={Settings01Icon} boxSize={6} />}
        aria-label={t("settings.title")}
        data-log-click={"setting button"}
        onClick={() => {
          if (tabIndex === -1) setTabByName("charts");
          else setTabByName("settings");
        }}
      />
    </Flex>
  );
}

export default function BaseApp() {
  const { t } = useTranslation();

  return (
    <Flex p={2} w={"100dvw"} h={"100dvh"} gap={2} flexDir="column" position={"relative"}>
      <Header />
      <TabsContainerBase
        flexDir="column"
        variant="soft-rounded"
        tabs={[
          {
            name: "charts",
            displayName: t("charts.title"),
            icon: ChartIcon,
            Panel: <SessionView />,
            displayingBeforeInit: false,
          },
          {
            name: "likes",
            displayName: t("bookmarks.title"),
            icon: HeartCheckIcon,
            Panel: <LikesView thumbnailSize={100} />,
            displayingBeforeInit: false,
          },
          {
            name: "search",
            displayName: t("search.title"),
            icon: Search02Icon,
            Panel: <DiscoverView tagSize="md" />,
            displayingBeforeInit: false,
          },
          {
            name: "settings",
            displayName: t("settings.title"),
            icon: Settings01Icon,
            Panel: (
              <Flex flexDir={"column"} justify={"space-between"} h="full">
                <PlaceHolder h="full" />
                <Spacer />
                <Settings align="start" />
              </Flex>
            ),
            displayingBeforeInit: true,
          },
        ]}
      />
    </Flex>
  );
}
