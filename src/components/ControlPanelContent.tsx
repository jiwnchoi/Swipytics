import { Card, Flex, type FlexProps } from "@chakra-ui/react";
import Controller from "./Controller";
import FileForm from "./FileForm";

interface ControlPanelProps extends FlexProps {
  scrollToChart: (direction: "up" | "down") => void;
  renewCurrentChart: () => void;
  currentChartIndex: number;
  disabled: boolean;
}

export default function ControlPanelContent({
  scrollToChart,
  renewCurrentChart,
  currentChartIndex,
  disabled,
  ...props
}: ControlPanelProps) {
  return (
    <Flex {...props}>
      <Card
        flexDir={"column"}
        w={"full"}
        h={"full"}
        gap={4}
        justifyContent={"space-between"}
        rounded="lg"
        p={4}
        bottom={0}>
        <Controller
          scrollToChart={scrollToChart}
          renewCurrentChart={renewCurrentChart}
          currentChartIndex={currentChartIndex}
          disabled={disabled}
        />
        <FileForm flexDir={"column"} gap={0} />
      </Card>
    </Flex>
  );
}
