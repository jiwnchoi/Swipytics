import { Flex } from "@chakra-ui/react";
import {
  Bookmarks,
  Browser,
  ChartPanel,
  ControlPanel,
  Controller,
  Fields,
  Settings,
  TabsContainer,
} from "@components";
import { useLayout } from "@hooks";
import { HeartCheckIcon, ProfileIcon, Search01Icon, Settings01Icon } from "hugeicons-react";

export default function App() {
  const { cardHeight, cardColor, cardWidth } = useLayout();

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      maxH={cardHeight}
      gap={4}
      flexDir={{ base: "column", lg: "row" }}>
      <Flex position="relative" w={cardWidth}>
        <ChartPanel w={"full"} gap={{ base: 0, lg: 4 }} />
      </Flex>
      <ControlPanel
        bgColor={cardColor}
        borderRadius={"lg"}
        w={{ base: "full", lg: "sm" }}
        minW={{ base: "full", lg: "sm" }}
        controller={<Controller spacing={2} w={"full"} />}>
        <TabsContainer // tabs추가하면 src/stores/useInteractionStore.ts에도 반영해야함
          tabs={[
            {
              name: "likes",
              icon: HeartCheckIcon,
              panel: <Bookmarks p={0} m={0} gap={2} w="full" />,
              displayingBeforeInit: false,
            },
            {
              name: "search",
              icon: Search01Icon,
              panel: <Browser />,
              displayingBeforeInit: false,
            },
            {
              name: "fields",
              icon: ProfileIcon,
              panel: <Fields />,
              displayingBeforeInit: false,
            },
            {
              name: "settings",
              icon: Settings01Icon,
              panel: <Settings align={"start"} />,
              displayingBeforeInit: true,
            },
          ]}
        />
      </ControlPanel>
    </Flex>
  );
}
