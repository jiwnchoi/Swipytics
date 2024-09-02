import {
  Flex,
  Heading,
  Image,
  ListItem,
  OrderedList,
  TabPanel,
  type TabPanelProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useBookmarks } from "@hooks";

export default function Bookmarks(props: TabPanelProps) {
  const { thumbnails, preferredCharts } = useBookmarks();
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <TabPanel {...props} display="flex" flexDirection="column" height="100%">
      <Flex
        flex={1}
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "darkorange",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "orange",
          },
        }}>
        <OrderedList m={0} p={0} width="100%">
          {thumbnails?.map((thumbnail, index) => (
            <ListItem
              as={Flex}
              key={preferredCharts[index].key}
              bgColor={bgColor}
              borderRadius="md"
              mb={2}
              gap={4}
              p={2}>
              {thumbnail && (
                <Image src={thumbnail} alt={preferredCharts[index].key} w="50px" h="50px" />
              )}
              <Flex flexDir="column" gap={1}>
                <Heading size="sm">{preferredCharts[index].attributes.join(" & ")}</Heading>
                <Text size="xs">This chart is very good</Text>
              </Flex>
            </ListItem>
          ))}
        </OrderedList>
      </Flex>
    </TabPanel>
  );
}
