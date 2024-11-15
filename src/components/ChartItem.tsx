import { Divider, Flex, Image, ListItem, Text } from "@chakra-ui/react";
import { useLayout, useThumnail } from "@hooks";
import { type TChart } from "@shared/models";

interface ChartItemProps {
  chart: TChart;
  handleClick: (chart: TChart) => void;
  thumbnailSize?: number;
}

function ChartItem({ chart, handleClick, thumbnailSize = 70 }: ChartItemProps) {
  const { buttonColor } = useLayout();
  const thumbnail = useThumnail(chart, thumbnailSize * 1.5);

  return (
    <ListItem key={`bookmark-${chart.key}`} as={Flex} flexDir="column">
      <Flex
        p={1}
        gap={4}
        borderRadius="md"
        alignItems={"center"}
        onClick={() => handleClick(chart)}
        transition={"background-color 0.2s"}
        _hover={{ cursor: "pointer", bg: buttonColor }}>
        {!!thumbnail && (
          <Image
            src={thumbnail}
            alt={`Chart thumbnail ${chart.title}`}
            w={thumbnailSize}
            h={thumbnailSize}
          />
        )}
        <Flex flexDir="column">
          {chart.fields.map((field, i) => (
            <Text
              key={`${chart.key}-field-name-${field.name}`}
              fontSize={i !== 2 ? "md" : "sm"}
              fontWeight={i !== 2 ? 800 : 500}>
              {field.name}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Divider my={1} />
    </ListItem>
  );
}
export default ChartItem;
