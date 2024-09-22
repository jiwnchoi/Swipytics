import { Divider, Flex, Image, ListItem, Text } from "@chakra-ui/react";
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
        gap={4}
        borderRadius="md"
        alignItems={"center"}
        onClick={() => onClick(chart)}
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
          {chart.fields.map((field) => (
            <Text key={`${chart.key}-field-name-${field.name}`} fontSize="sm">
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
