import { Flex, type FlexProps, Icon, IconButton } from "@chakra-ui/react";
import { ArrowDown01Icon, ArrowUp01Icon, BookmarkAdd01Icon, Exchange01Icon } from "hugeicons-react";

interface ControllerProps extends FlexProps {
  scrollToChart: (direction: "up" | "down") => void;
  renewCurrentChart: () => void;
  currentChartIndex: number;
  disabled: boolean;
}

const Controller = ({
  scrollToChart,
  renewCurrentChart,
  currentChartIndex,
  disabled,
  ...props
}: ControllerProps) => (
  <Flex {...props}>
    {[
      {
        label: "Previous chart",
        icon: ArrowUp01Icon,
        onClick: () => scrollToChart("up"),
        isDisabled: currentChartIndex === 0 || disabled,
      },
      {
        label: "Next chart",
        icon: ArrowDown01Icon,
        onClick: () => scrollToChart("down"),
        isDisabled: disabled,
      },
      {
        label: "Renew current chart",
        icon: Exchange01Icon,
        onClick: renewCurrentChart,
        isDisabled: disabled,
      },
      { label: "Bookmark current chart", icon: BookmarkAdd01Icon, isDisabled: disabled },
    ].map(({ label, icon, onClick, isDisabled }, index) => (
      <IconButton
        key={index}
        size="lg"
        w="full"
        aria-label={label}
        icon={<Icon as={icon} />}
        onClick={onClick}
        isDisabled={isDisabled}
      />
    ))}
  </Flex>
);

export default Controller;
