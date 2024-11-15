import { Center, Fade, Flex, OrderedList, Spinner } from "@chakra-ui/react";
import { ChartItem, FieldTag } from "@components";
import { useLayout } from "@hooks";

import useDiscoverView from "./useDiscoverView";

export default function DiscoverView() {
  const { accentColor, scrollbarStyle } = useLayout();
  const { getTagVariant, loading, queriedCharts, handleFieldClick, handleChartClick, fields } =
    useDiscoverView();

  return (
    <Flex flexDir={"column"} w="full" h="full" justify={"space-between"}>
      <Center w="full">
        {loading ? (
          <Spinner size="md" my={8} color={accentColor} />
        ) : (
          <OrderedList m={0} p={0} width="full" overflowY="scroll" sx={scrollbarStyle} flex={1}>
            {queriedCharts.map((chart) => (
              <Fade key={`discovered-chart-${chart.key}-${chart.timestamp}`} in={true}>
                <ChartItem
                  thumbnailSize={130}
                  chart={chart}
                  handleClick={() => {
                    handleChartClick(chart);
                  }}
                />
              </Fade>
            ))}
          </OrderedList>
        )}
      </Center>

      <Center flexWrap={"wrap"} gap={3} h="fit-content">
        {fields.map((field) => (
          <FieldTag
            key={`discover-badge-${field.name}`}
            field={field}
            size={"lg"}
            variant={getTagVariant(field)}
            onClick={() => handleFieldClick(field)}
          />
        ))}
      </Center>
    </Flex>
  );
}
