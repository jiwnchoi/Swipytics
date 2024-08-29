import { Flex, type FlexProps } from "@chakra-ui/react";
import { type ReactNode, type Ref, forwardRef } from "react";

interface ChartPanelProps extends FlexProps {
  children: ReactNode;
}

function _ChartPanel({ children, ...props }: ChartPanelProps, ref: Ref<HTMLDivElement>) {
  return (
    <Flex
      {...props}
      ref={ref}
      w={"full"}
      scrollSnapType={"y mandatory"}
      overflowY={"auto"}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}>
      {children}
    </Flex>
  );
}

export default forwardRef<HTMLDivElement, ChartPanelProps>(_ChartPanel);
