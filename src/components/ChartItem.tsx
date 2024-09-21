import { Divider, Flex, Heading, Image, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLayout } from "../hooks";
import { type TChart } from "../shared/models";
import { getThumbnailFromSpec } from "../shared/utils";
import { useDataStore } from "../stores";

interface ChartItemProps {
  chart: TChart;
  onClick: (chart: TChart) => void;
}

function ChartItem({ chart, onClick }: ChartItemProps) {
  const { buttonColor, thumbnailSize } = useLayout();
  const data = useDataStore((state) => state.data);
  const [thumbnail, setThumbnail] = useState<string | undefined>(chart.thumbnail);

  useEffect(() => {
    if (!thumbnail && data) {
      const fetchThumbnail = async () => {
        const thumbnail = await getThumbnailFromSpec(chart.specs[0], data);
        setThumbnail(thumbnail);
      };
      fetchThumbnail();
    }
  }, [chart.specs, data, thumbnail]);

  return (
    <ListItem key={`bookmark-${chart.key}`} as={Flex} flexDir="column">
      <Flex
        p={1}
        gap={2}
        borderRadius="md"
        onClick={() => onClick(chart)}
        transition="background-color 0.2s ease-in-out"
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
          <Heading size="sm">{chart.fields.map((field) => field.name).join(" & ")}</Heading>
          <Text size="xs">This chart is very good</Text>
        </Flex>
      </Flex>
      <Divider my={1} />
    </ListItem>
  );
}
export default ChartItem;
