import { Divider, Flex, Image, ListItem } from "@chakra-ui/react";
import { useLayout, useThumnail } from "@hooks";
import { type TChart } from "@shared/models";
import ChartTitle from "./ChartTitle";

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
            w={`${thumbnailSize}px`}
            h={`${thumbnailSize}px`}
          />
        )}
        <ChartTitle chart={chart} />
      </Flex>
      <Divider my={1} />
    </ListItem>
  );
}
export default ChartItem;
