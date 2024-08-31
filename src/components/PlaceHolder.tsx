import { Center, type CenterProps, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { SwipeUp02Icon } from "hugeicons-react";

export default function PlaceHolder(props: CenterProps) {
  const { mobile } = useLayout();
  return (
    <Flex justify={mobile ? "start" : "center"} {...props}>
      <Center flexDir={"column"} minH={"500px"}>
        <Center gap={2} mb={4}>
          <Icon as={SwipeUp02Icon} boxSize={16} />
          <Heading fontSize={48}>Swipytics</Heading>
        </Center>
        <Text textColor={"gray"} textAlign={"center"}>
          The Simplest On-the-fly Exploratory Analytics
        </Text>
      </Center>
    </Flex>
  );
}
