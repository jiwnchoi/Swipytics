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
import { PRIMARY_COLOR } from "@shared/constants";
import useColors from "../hooks/useLayout";
import ChartItem from "./ChartItem";

function Browser() {
  const {
    scrollbarStyle,
    buttonColor,
    borderColor,
    cardColor,
    accentSelected,
    accentSelectedHover,
    accentColor,
  } = useLayout();

  const {
    browsedCharts,
    inputDisabled,
    loading,
    fieldNameMatches,
    selectedFields,
    inputValue,
    setInputValue,
    appendBrowseField,
    appendBrowsedChart,
    handleKeydown,
    suggestionCursorIndex,
  } = useBrowser();

  const { tabPanelHeight } = useColors();

  return (
    <TabPanel as={VStack} w="full" alignItems="center" h={tabPanelHeight}>
      <Box w="100%" position="relative">
        <HStack
          spacing={1}
          borderRadius={"md"}
          alignItems="flex-start"
          w="100%"
          flexWrap="wrap"
          border={"1px solid"}
          borderBottomRadius={fieldNameMatches.length > 0 ? 0 : "md"}
          borderColor={borderColor}
          p={2}>
          {selectedFields.map((field) => (
            <Tag key={field} borderRadius="full" colorScheme={PRIMARY_COLOR}>
              <TagLabel>{field}</TagLabel>
              <TagCloseButton onClick={() => appendBrowseField(field)} />
            </Tag>
          ))}
          <Input
            type="text"
            w="fit-content"
            h="fit-content"
            px={2}
            minW={selectedFields.length > 0 ? 0 : 60}
            placeholder={selectedFields.length > 0 ? "" : "Input field names to search..."}
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
            w="full"
            borderTopRadius={0}
            borderColor={borderColor}
            borderWidth={1}
            position="absolute"
            zIndex={1}>
            {fieldNameMatches.map((match, idx) => (
              <Box
                key={match.item}
                onClick={() => appendBrowseField(match.item)}
                data-log-click={`field-name-match-${match.item}`}
                bgColor={(() => {
                  const isSelected = selectedFields.includes(match.item);
                  const isCurrentCursor = idx === suggestionCursorIndex;
                  if (isSelected) return isCurrentCursor ? accentSelectedHover : accentSelected;
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

      {loading ? (
        <Spinner size="md" my={8} color={accentColor} />
      ) : (
        <OrderedList m={0} p={0} width="full" overflowY="scroll" sx={scrollbarStyle} flex={1}>
          {browsedCharts.map((chart) => (
            <ChartItem
              key={`${chart.key}-${chart.timestamp}`}
              chart={chart}
              onClick={() => {
                appendBrowsedChart(chart);
              }}
            />
          ))}
        </OrderedList>
      )}
    </TabPanel>
  );
}

export default Browser;
