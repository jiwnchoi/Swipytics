import { Flex } from "@chakra-ui/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  BookmarkAdd01Icon,
  Exchange01Icon,
  LinkForwardIcon,
} from "hugeicons-react";
import ResponsiveButton from "./ResponsiveButton";

interface ControllerProps {
  scrollToChart: (direction: "up" | "down") => void;
  renewCurrentChart: () => void;
  currentChartIndex: number;
}

const Controller = (props: ControllerProps) => {
  const { scrollToChart, renewCurrentChart, currentChartIndex } = props;
  return (
    <Flex w="full" gap={2}>
      <ResponsiveButton
        w="full"
        label="이전 시각화"
        icon={ArrowUp01Icon}
        onClick={() => scrollToChart("up")}
        isDisabled={currentChartIndex === 0}
      />
      <ResponsiveButton
        w="full"
        label="다음 시각화"
        icon={ArrowDown01Icon}
        onClick={() => scrollToChart("down")}
      />
      <ResponsiveButton w="full" label="다른 속성" icon={LinkForwardIcon} />
      <ResponsiveButton
        w="full"
        label="다른 시각화"
        icon={Exchange01Icon}
        onClick={() => {
          renewCurrentChart();
        }}
      />
      <ResponsiveButton w="full" label="저장 하기" icon={BookmarkAdd01Icon} />
    </Flex>
  );
};

export default Controller;
