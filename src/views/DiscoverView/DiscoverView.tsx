import { Center, Fade, Flex, OrderedList, Spacer, Spinner, type FlexProps } from "@chakra-ui/react";
import { ChartItem, FieldTag } from "@components";
import { useLayout } from "@hooks";

import useDiscoverView from "./useDiscoverView";

interface DiscoverViewProps extends FlexProps {
  thumbnailSize?: number;
  tagSize?: "sm" | "md" | "lg";
}

export default function DiscoverView({
  thumbnailSize = 80,
  tagSize = "lg",
  ...props
}: DiscoverViewProps) {
  const { accentColor, scrollbarStyle } = useLayout();
  const {
    isSelected,
    loading,
    queriedCharts,
    handleFieldClick,
    handleChartClick,
    fields,
    selectionFull,
  } = useDiscoverView();

  return (
    <Flex flexDir={"column"} w="full" h="full" justify={"space-between"} {...props}>
      {loading ? (
        <Center w="full" flex={"1 1 auto"}>
          <Spinner size="md" my={8} color={accentColor} />
        </Center>
      ) : (
        <OrderedList
          m={0}
          p={0}
          width="full"
          overflowY="scroll"
          sx={scrollbarStyle}
          flex={"1 1 auto"}>
          {queriedCharts.map((chart) => (
            <Fade key={`discovered-chart-${chart.key}-${chart.timestamp}`} in={true}>
              <ChartItem
                thumbnailSize={thumbnailSize}
                chart={chart}
                handleClick={() => {
                  handleChartClick(chart);
                }}
              />
            </Fade>
          ))}
        </OrderedList>
      )}
      <Spacer my={4} />
      <Center flexWrap={"wrap"} gap={3} h="fit-content" flex={"0 0 auto"}>
        {fields.map((field) => (
          <FieldTag
            selected={isSelected(field)}
            key={`discover-badge-${field.name}`}
            field={field}
            size={tagSize}
            variant={isSelected(field) ? "solid" : "outline"}
            onClick={() => handleFieldClick(field)}
            opacity={isSelected(field) ? 1 : selectionFull ? 0.2 : 1}
          />
        ))}
      </Center>
    </Flex>
  );
}
