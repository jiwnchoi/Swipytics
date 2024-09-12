import { Divider, Flex, Heading, Image, ListItem, Text } from "@chakra-ui/react";
import { useLayout } from "../hooks";
import { type TChart } from "../shared/models";

interface ChartItemProps {
  chart: TChart;
  handleClick: (chart: TChart) => void;
}

function ChartItem({ chart, handleClick }: ChartItemProps) {
  const { drawerBgColor, thumbnailSize } = useLayout();
  return (
    <ListItem key={`bookmark-${chart.key}`} as={Flex} flexDir="column">
      <Flex
        p={1}
        gap={2}
        borderRadius="md"
        onClick={() => handleClick(chart)}
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
          <Heading size="sm">{chart.fields.map((field) => field.name).join(" & ")}</Heading>
          <Text size="xs">This chart is very good</Text>
        </Flex>
      </Flex>
      <Divider my={1} />
    </ListItem>
  );
}
export default ChartItem;
