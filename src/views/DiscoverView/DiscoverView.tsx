import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  OrderedList,
  Skeleton,
  SkeletonText,
  type FlexProps,
} from "@chakra-ui/react";
import { ChartItem, FieldTag } from "@components";
import { useLayout } from "@hooks";
import { Search01Icon, SearchRemoveIcon } from "hugeicons-react";
import { useTranslation } from "react-i18next";
import useDiscoverView from "./useDiscoverView";

interface DiscoverViewProps extends FlexProps {
  thumbnailSize?: number;
  tagSize?: "sm" | "md" | "lg";
}

const LoadingSkeleton = ({ count = 5, thumbnailSize }: { count?: number; thumbnailSize: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <Box key={`skeleton-${index}`}>
      <Flex gap={4} p={1} align="center">
        <Skeleton
          height={`${thumbnailSize - 8}px`}
          width={`${thumbnailSize - 8}px`}
          borderRadius="md"
        />
        <Flex flexDir="column" flex="1" gap={2}>
          <SkeletonText
            noOfLines={2}
            spacing={2}
            skeletonHeight={4}
            width={`calc(100% - ${thumbnailSize - 16})`}
          />
        </Flex>
      </Flex>
      <Divider my={1} />
    </Box>
  ));

export default function DiscoverView({
  thumbnailSize = 80,
  tagSize = "lg",
  ...props
}: DiscoverViewProps) {
  const { scrollbarStyle } = useLayout();
  const {
    isSelected,
    loading,
    queriedCharts,
    handleFieldClick,
    handleChartClick,
    fields,
    selectedFields,
  } = useDiscoverView();
  const { t } = useTranslation();

  return (
    <Flex flexDir="column" w="full" h="full" justify="space-between" gap={4} {...props}>
      {loading ? (
        <OrderedList
          m={0}
          p={0}
          width="full"
          overflowY="scroll"
          sx={scrollbarStyle}
          flex="1 1 auto">
          <LoadingSkeleton
            thumbnailSize={thumbnailSize}
            count={selectedFields.length === 3 ? 3 : 1}
          />
        </OrderedList>
      ) : queriedCharts.length === 0 && selectedFields.length === 0 ? (
        <Center w="full" h="full" flexDir="column" gap={8} px={8}>
          <Icon boxSize={16} as={Search01Icon} />
          <Heading maxW={240} fontSize={24} fontWeight={600} textAlign="center">
            {t("search.empty")}
          </Heading>
        </Center>
      ) : queriedCharts.length === 0 && selectedFields.length !== 0 ? (
        <Center w="full" h="full" flexDir="column" gap={8} px={8}>
          <Icon boxSize={16} as={SearchRemoveIcon} />
          <Heading fontSize={24} fontWeight={600} textAlign="center" maxW={280}>
            {t("search.no-results")}
          </Heading>
        </Center>
      ) : (
        <OrderedList
          m={0}
          p={0}
          width="full"
          overflowY="scroll"
          sx={scrollbarStyle}
          flex="1 1 auto">
          {queriedCharts.map((chart) => (
            <ChartItem
              key={`discovered-chart-${chart.key}-${chart.timestamp}`}
              thumbnailSize={thumbnailSize}
              chart={chart}
              logClick={`append_discovered_chart-${chart.title}`}
              handleClick={() => {
                handleChartClick(chart);
              }}
            />
          ))}
        </OrderedList>
      )}

      <Center flexWrap="wrap" gap={3} h="fit-content" flex="0 0 auto">
        {fields.map((field) => (
          <FieldTag
            key={`discover-badge-${field.name}`}
            selected={isSelected(field)}
            field={field}
            size={tagSize}
            variant={isSelected(field) ? "solid" : "outline"}
            onClick={() => handleFieldClick(field)}
            data-log-click={`search-field-tag-${field.name}`}
            opacity={isSelected(field) ? 1 : selectedFields.length === 3 ? 0.2 : 1}
            transition={"all 0.1s ease-in-out"}
          />
        ))}
      </Center>
    </Flex>
  );
}
