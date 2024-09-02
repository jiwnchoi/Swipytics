import {
  Divider,
  Flex,
  Heading,
  Image,
  ListItem,
  OrderedList,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { useBookmarks, useLayout } from "@hooks";
import { scrollbarStyle } from "@shared/theme";

export default function Bookmarks({ ...props }) {
  const { preferredCharts, handleClickBookmark } = useBookmarks();
  const { drawerBgColor, thumbnailSize } = useLayout();

  return (
    <TabPanel {...props} display="flex" flexDirection="column" height="full">
      <OrderedList m={0} p={0} width="full" overflowY="auto" sx={scrollbarStyle}>
        {preferredCharts.map(chart => (
          <ListItem key={`bookmark-${chart.key}`} as={Flex} flexDir="column">
            <Flex
              p={1}
              gap={2}
              borderRadius="md"
              onClick={() => handleClickBookmark(chart)}
              _hover={{ cursor: "pointer", bg: drawerBgColor }}>
              {!!chart.thumbnail && (
                <Image
                  src={chart.thumbnail}
                  alt={`Chart thumbnail ${chart.title}`}
                  w={thumbnailSize}
                  h={thumbnailSize}
                />
              )}
              <Flex flexDir="column">
                <Heading size="sm">{chart.attributes.join(" & ")}</Heading>
                <Text size="xs">This chart is very good</Text>
              </Flex>
            </Flex>
            <Divider my={1} />
          </ListItem>
        ))}
      </OrderedList>
    </TabPanel>
  );
}
