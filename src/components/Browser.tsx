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
  const { scrollbarStyle, buttonColor, borderColor, cardColor, orange50Color, orange100Color } =
    useLayout();

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
    handleKeydown,
    suggestionCursorIndex,
  } = useBrowser();

  return (
    <TabPanel as={VStack} alignItems="stretch" h="100%">
      <Box w="100%" position="relative">
        <HStack
          spacing={1}
          borderRadius={"md"}
          alignItems="flex-start"
          w="100%"
          flexWrap="wrap"
          border={"1px solid"}
          borderColor={borderColor}
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
            onKeyDown={handleKeydown}
          />
        </HStack>
        {fieldNameMatches.length > 0 && (
          <VStack
            alignItems="flex-start"
            borderRadius={6}
            overflow="hidden"
            gap={0}
            w="96%"
            borderColor={borderColor}
            borderWidth={1}
            position="absolute"
            zIndex={1}>
            {fieldNameMatches.map((match, idx) => (
              <Box
                key={match.item}
                onClick={() => handleFieldSelection(match.item)}
                bgColor={(() => {
                  const isSelected = selectedFields.includes(match.item);
                  const isCurrentCursor = idx === suggestionCursorIndex;
                  if (isSelected) return isCurrentCursor ? orange100Color : orange50Color;
                  return isCurrentCursor ? buttonColor : cardColor;
                })()}
                w="100%"
                pl={2}
                cursor="pointer"
                borderTopWidth={1}
                borderTopColor={borderColor}>
                {match.item}
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      {loading && <Spinner size="md" color={orange100Color} />}
      <OrderedList m={0} p={0} width="full" overflowY="scroll" sx={scrollbarStyle} flex={1}>
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
