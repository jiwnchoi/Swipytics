import { Divider, Flex, Image, ListItem, keyframes } from "@chakra-ui/react";
import { useLayout, useThumnail } from "@hooks";
import { type TChart } from "@shared/models";
import ChartTitle from "./ChartTitle";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface ChartItemProps {
  chart: TChart;
  handleClick: (chart: TChart) => void;
  thumbnailSize?: number;
}

function ChartItem({ chart, handleClick, thumbnailSize = 70 }: ChartItemProps) {
  const { buttonColor } = useLayout();
  const thumbnail = useThumnail(chart, thumbnailSize * 1.5);

  return (
    <ListItem
      key={`bookmark-${chart.key}`}
      as={Flex}
      flexDir="column"
      animation={`${fadeIn} 0.2s ease-in-out`}
      sx={{
        "&.removing": {
          animation: `${fadeOut} 0.1s ease-in-out forwards`,
        },
      }}>
      <Flex
        p={1}
        gap={4}
        borderRadius="md"
        alignItems="center"
        onClick={() => handleClick(chart)}
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
