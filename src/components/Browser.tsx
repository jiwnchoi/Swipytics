import {
  Box,
  HStack,
  Input,
  OrderedList,
  Spinner,
  TabPanel,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppendChart, useBrowseCharts, useFieldNameMatches, useLayout } from "../hooks";
import ChartItem from "./ChartItem";

const MAX_SELECTED_FIELDS = 3;

function Browser() {
  const [inputValue, setInputValue] = useState<string>("");
  const fieldNameMatches = useFieldNameMatches(inputValue);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const { charts: browsedCharts, isLoading: isChartLoading } = useBrowseCharts(selectedFields);
  const { scrollbarStyle } = useLayout();
  const { appendChart } = useAppendChart();

  useEffect(() => {
    if (selectedFields.length >= MAX_SELECTED_FIELDS) {
      setInputValue("");
    }
  }, [selectedFields]);

  return (
    <TabPanel as={VStack}>
      <Box w="100%">
        <Input
          type="text"
          placeholder="field names"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={selectedFields.length >= MAX_SELECTED_FIELDS}
          onKeyDown={(e) => {
            // 키보드 상하좌우 키다운으로 트리거되는 차트 이동 이벤트를 막는다.
            if (
              e.key === "ArrowDown" ||
              e.key === "ArrowUp" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight"
            ) {
              e.stopPropagation();
            }
          }}
        />
        {fieldNameMatches.length > 0 && (
          <VStack
            alignItems="flex-start"
            w="100%"
            borderBottomRadius={6}
            overflow="hidden"
            gap={0}
            borderColor="gray.200"
            borderWidth={1}>
            {fieldNameMatches.map((match) => (
              <Box
                key={match.item}
                onClick={() => {
                  if (selectedFields.includes(match.item)) {
                    setSelectedFields((acc) => acc.filter((f) => f != match.item));
                    // or other handling ..
                  } else {
                    setSelectedFields((acc) => [...acc, match.item]);
                  }
                }}
                bgColor={selectedFields.includes(match.item) ? "orange.50" : "white"}
                _hover={{ bgColor: selectedFields.includes(match.item) ? "orange.50" : "gray.50" }}
                w="100%"
                pl={2}
                cursor="pointer"
                borderTopWidth={1}
                borderTopColor="gray.200">
                {match.item}
              </Box>
            ))}
          </VStack>
        )}
      </Box>
      <HStack spacing={1} alignItems="flex-start" w="100%" flexWrap="wrap">
        {selectedFields.map((field) => (
          <Tag key={field} borderRadius="full" colorScheme="orange">
            <TagLabel>{field}</TagLabel>
            <TagCloseButton
              onClick={() => setSelectedFields((acc) => acc.filter((f) => f != field))}
            />
          </Tag>
        ))}
      </HStack>
      {isChartLoading && <Spinner size="md" color="orange.100" />}
      <OrderedList m={0} p={0} width="full" overflowY="auto" sx={scrollbarStyle}>
        {browsedCharts.map((chart) => (
          <ChartItem
            key={`${chart.key}-${chart.timestamp}`}
            chart={chart}
            handleClick={() => {
              appendChart(chart);
            }}
          />
        ))}
      </OrderedList>
    </TabPanel>
  );
}

export default Browser;
