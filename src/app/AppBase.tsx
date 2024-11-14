import { Flex, Heading, Icon, IconButton, Spacer } from "@chakra-ui/react";
import {
  Bookmarks,
  ChartPanel,
  Fields,
  PlaceHolder,
  Settings,
  TabsContainerBase,
} from "@components";
import { useLayout } from "@hooks";
import { useInteractionStore, useSessionsStore } from "@stores";
import {
  ChartIcon,
  HeartCheckIcon,
  Search01Icon,
  Settings01Icon,
  SwipeUp02Icon,
} from "hugeicons-react";
import { useTranslation } from "react-i18next";

function Header() {
  const { accentColor } = useLayout();
  const tabIndex = useInteractionStore((state) => state.tabIndex);
  const setTabByName = useInteractionStore((state) => state.setTabByName);
  const { t } = useTranslation();
  const fields = useSessionsStore((state) => state.fields);

  return (
    <Flex w="full" justifyContent={"space-between"} alignItems={"center"}>
      {tabIndex !== 3 ? (
        <Flex alignItems={"center"} h="full" gap={1}>
          <Icon as={SwipeUp02Icon} boxSize={6} />
          <Heading size={"xs"}>Swipytics</Heading>
        </Flex>
      ) : (
        <Flex />
      )}
      <IconButton
        variant={"ghost"}
        padding={0}
        isDisabled={fields.length === 0}
        color={tabIndex === 3 ? accentColor : undefined}
        icon={<Icon as={Settings01Icon} boxSize={4} />}
        aria-label={t("settings")}
        onClick={() => {
          if (tabIndex === 3) {
            setTabByName("fields");
          } else {
            setTabByName("settings");
          }
        }}
      />
    </Flex>
  );
}

export default function BaseApp() {
  const { cardWidth } = useLayout();
  const { t } = useTranslation();

  return (
    <Flex p={2} w={"100dvw"} h={"100dvh"} gap={2} flexDir="column">
      <Header />
      <TabsContainerBase
        flexDir="column"
        variant="soft-rounded"
        tabs={[
          {
            name: "likes",
            displayName: t("bookmarks.title"),
            icon: HeartCheckIcon,
            Panel: <Bookmarks p={4} m={0} gap={2} w="full" />,
            displayingBeforeInit: false,
          },
          {
            name: "fields",
            displayName: t("charts.title"),
            icon: ChartIcon,
            Panel: <ChartPanel maxW={cardWidth} gap={4} orientation="vertical" />,
            displayingBeforeInit: false,
          },
          {
            name: "search",
            displayName: t("search.title"),
            icon: Search01Icon,
            Panel: <Fields p={4} />,
            displayingBeforeInit: false,
          },
          {
            name: "settings",
            displayName: t("settings.title"),
            icon: Settings01Icon,
            Panel: (
              <Flex flexDir={"column"} justify={"space-between"} p={4} h="full">
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