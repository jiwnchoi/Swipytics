import { Card, Flex, type FlexProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function ControlPanelContent({ children, ...props }: PropsWithChildren<FlexProps>) {
  return (
    <Flex {...props}>
      <Card flexDir={"column"} w={"full"} h={"full"} gap={4} rounded="lg" p={4} bottom={0}>
        {children}
      </Card>
    </Flex>
  );
}
