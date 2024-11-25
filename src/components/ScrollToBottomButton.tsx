import { Fade, Flex, Icon, IconButton, type FlexProps } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { ArrowDown03Icon } from "hugeicons-react";
import { memo } from "react";

export const ScrollToBottomButton = memo(ScrollToBottomButtonImpl);

function ScrollToBottomButtonImpl(props: FlexProps) {
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const charts = useSessionsStore((state) => state.charts);
  const appendingChart = useSessionsStore((state) => state.appendingChart);
  const { cardWidth } = useLayout();
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);

  return (
    <Fade
      in={
        currentChartIndex < charts.length - 2 ||
        (appendingChart && currentChartIndex === charts.length - 2)
      }>
      <Flex {...props}>
        <IconButton
          variant="outline"
          colorScheme={PRIMARY_COLOR}
          position="absolute"
          bottom={6}
          left={cardWidth / 2 - 24}
          borderRadius="xl"
          size="lg"
          aria-label="Scroll to bottom"
          icon={<Icon as={ArrowDown03Icon} boxSize={8} />}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentChartIndex(charts.length - 2);
          }}
          data-log-click="scroll-to-bottom"
        />
      </Flex>
    </Fade>
  );
}
