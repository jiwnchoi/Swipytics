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
import { useBrowser, useLayout } from "@hooks";
import ChartItem from "./ChartItem";

function Browser() {
  const { scrollbarStyle } = useLayout();
  const {
    browsedCharts,
    inputDisabled,
    loading,
    fieldNameMatches,
    selectedFields,
    inputValue,
    setInputValue,
    handleFieldSelection,
    appendChart,
  } = useBrowser();

  return (
    <TabPanel as={VStack}>
      <Box w="100%">
        <HStack
          spacing={1}
          borderRadius={"md"}
          alignItems="flex-start"
          w="100%"
          flexWrap="wrap"
          border={"1px solid"}
          borderColor={"gray.200"}
          p={2}>
          {selectedFields.map((field) => (
            <Tag key={field} borderRadius="full" colorScheme="orange">
              <TagLabel>{field}</TagLabel>
              <TagCloseButton onClick={() => handleFieldSelection(field)} />
            </Tag>
          ))}

          <Input
            type="text"
            w="fit-content"
            h="fit-content"
            px={2}
            minW={48}
            placeholder="Input field names to search..."
            borderColor={"transparent"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={inputDisabled}
            _focusVisible={{ borderColor: "transparent" }}
            _hover={{ borderColor: "transparent" }}
            onKeyDown={(e) => {
              if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.stopPropagation();
              }
            }}
          />
        </HStack>
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
                onClick={() => handleFieldSelection(match.item)}
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

      {loading && <Spinner size="md" color="orange.100" />}
      <OrderedList m={0} p={0} width="full" overflowY="auto" sx={scrollbarStyle}>
        {browsedCharts.map((chart) => (
          <ChartItem
            key={`${chart.key}-${chart.timestamp}`}
            chart={chart}
            handleClick={() => void appendChart(chart)}
          />
        ))}
      </OrderedList>
    </TabPanel>
  );
}

export default Browser;
