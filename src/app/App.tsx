import { Flex, TabPanel } from "@chakra-ui/react";
import {
  Bookmarks,
  ChartPanel,
  ControlPanel,
  Controller,
  MetadataFields,
  ScrollIndicator,
  Settings,
  TabsContainer,
} from "@components";
import { useLayout } from "@hooks";
import {
  DiscoverCircleIcon,
  HeartCheckIcon,
  PresentationBarChart01Icon,
  ProfileIcon,
  Search01Icon,
  Settings01Icon,
} from "hugeicons-react";
import Browser from "../components/Browser";

export default function App() {
  const { cardHeight, cardColor, cardWidth, mobile } = useLayout();

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      maxH={cardHeight}
      position={"relative"}
      gap={4}
      flexDir={{ base: "column", lg: "row" }}>
      <Flex position="relative" w={cardWidth}>
        <ScrollIndicator
          top={mobile ? 0 : undefined}
          bottom={mobile ? undefined : 0}
          h={8}
          w="full"
          p={2}
        />
        <ChartPanel w={"full"} gap={{ base: 0, lg: 4 }} />
      </Flex>
      <ControlPanel
        bgColor={cardColor}
        borderRadius={"lg"}
        w={{ base: "full", lg: "sm" }}
        minW={{ base: "full", lg: "sm" }}
        controller={<Controller spacing={2} w={"full"} />}>
        <TabsContainer
          tabs={[
            {
              type: "Likes",
              icon: HeartCheckIcon,
              panel: <Bookmarks p={0} m={0} gap={2} w="full" />,
              displayingBeforeInit: false,
            },
            {
              type: "Explore",
              icon: DiscoverCircleIcon,
              panel: <TabPanel>Chart Browser for Manual Chart query at here</TabPanel>,
              displayingBeforeInit: false,
            },
            {
              type: "Chart",
              icon: PresentationBarChart01Icon,
              panel: <TabPanel>Chart Description and Explanation at Here</TabPanel>,
              displayingBeforeInit: false,
            },
            {
              type: "Fields",
              icon: ProfileIcon,
              panel: <MetadataFields />,
              displayingBeforeInit: false,
            },
            {
              type: "Browser",
              icon: Search01Icon,
              panel: <Browser />,
              displayingBeforeInit: false,
            },
            {
              type: "Settings",
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
