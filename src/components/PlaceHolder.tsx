import { Center, type CenterProps, Heading, Icon, Text } from "@chakra-ui/react";
import { SwipeUp02Icon } from "hugeicons-react";

export default function PlaceHolder(props: CenterProps) {
  return (
    <Center {...props}>
      <Center gap={2}>
        <Icon as={SwipeUp02Icon} boxSize={16} />
        <Heading fontSize={48}>Swipytics</Heading>
      </Center>
      <Text textColor={"gray"}>Your Simplest On-the-fly Exploratory Analytics</Text>
    </Center>
  );
}
