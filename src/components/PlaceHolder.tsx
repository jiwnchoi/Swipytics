import { Center, type CenterProps, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { SwipeLeft02Icon } from "hugeicons-react";
import { memo } from "react";
import CopyRight from "./CopyRight";

function PlaceHolderImpl(props: CenterProps) {
  const { mobile } = useLayout();
  return (
    <Flex justify={mobile ? "start" : "center"} {...props}>
      <Center flexDir={"column"} minH={"400px"}>
        <Center gap={2} mb={4}>
          <Icon as={SwipeLeft02Icon} boxSize={16} />
          <Heading fontSize={48}>Swipytics</Heading>
        </Center>
        <Text textColor={"gray"} textAlign={"center"}>
          The Simplest On-the-fly Exploratory Analytics
        </Text>
      </Center>
      <CopyRight />
    </Flex>
  );
}

export default memo(PlaceHolderImpl);
