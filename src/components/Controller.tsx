import { Flex, type FlexProps, Icon, IconButton } from "@chakra-ui/react";
import { ArrowDown01Icon, ArrowUp01Icon, BookmarkAdd01Icon, Exchange01Icon } from "hugeicons-react";

interface ControllerProps extends FlexProps {
  scrollToChart: (direction: "up" | "down") => void;
  renewCurrentChart: () => void;
  currentChartIndex: number;
  disabled: boolean;
}

function Controller({
  scrollToChart,
  renewCurrentChart,
  currentChartIndex,
  disabled,
  ...props
}: ControllerProps) {
  return (
    <Flex {...props}>
      <IconButton
        w="full"
        aria-label="Previous chart"
        icon={<Icon as={ArrowUp01Icon} />}
        onClick={() => scrollToChart("up")}
        isDisabled={currentChartIndex === 0 || disabled}
      />
      <IconButton
        w="full"
        aria-label="Next chart"
        icon={<Icon as={ArrowDown01Icon} />}
        onClick={() => scrollToChart("down")}
        isDisabled={disabled}
      />
      {/* <IconButton w="full" label="다른 속성" icon={LinkForwardIcon} isDisabled={disabled} /> */}
      <IconButton
        w="full"
        aria-label="Renew current chart"
        icon={<Icon as={Exchange01Icon} />}
        onClick={renewCurrentChart}
        isDisabled={disabled}
      />
      <IconButton
        w="full"
        aria-label="Bookmark current chart"
        icon={<Icon as={BookmarkAdd01Icon} />}
        isDisabled={disabled}
      />
    </Flex>
  );
}

export default Controller;
