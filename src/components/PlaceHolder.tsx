import { Box, Center, type CenterProps, Heading, Icon, Text } from "@chakra-ui/react";
import { SwipeUp02Icon } from "hugeicons-react";

export default function PlaceHolder(props: CenterProps) {
  return (
    <Center {...props}>
      <Center gap={2} mb={4}>
        <Icon as={SwipeUp02Icon} boxSize={16} />
        <Heading fontSize={48}>Swipytics</Heading>
      </Center>
      <Text textColor={"gray"} textAlign={"center"}>
        The Simplest On-the-fly Exploratory Analytics
      </Text>
      <Text textColor={"gray"} textAlign={"center"}>
        Fully On-device, At Your Fingertips
      </Text>
      <Box minH={{ base: "200px", md: "0px" }} />
    </Center>
  );
}
