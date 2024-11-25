import {
  Button,
  Center,
  type CenterProps,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GithubIcon, LabelImportantIcon, SwipeUp02Icon } from "hugeicons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function PlaceHolderImpl(props: CenterProps) {
  const { t } = useTranslation();
  return (
    <Center flexDir={"column"} p={2} {...props}>
      <Center gap={2} mb={4}>
        <Icon as={SwipeUp02Icon} boxSize={12} />
        <Heading fontSize={40}>Swipytics</Heading>
      </Center>
      <Text textColor={"gray"} textAlign={"center"} fontSize={"sm"}>
        {t("home.description")}
      </Text>
      <VStack w="full" color={"gray"} gap={1} mt={8} p={0}>
        <Flex gap={1}>
          <Text fontSize="xs" textAlign="center">
            Swipytics @ 2024
          </Text>
          <Link href="https://jiwnchoi.me" isExternal>
            <Text fontSize="xs" textAlign="center" textDecoration={"underline"}>
              Jiwon Choi
            </Text>
          </Link>
          <Text fontSize="xs" textAlign="center">
            All rights reserved.
          </Text>
        </Flex>
        <Flex gap={4}>
          <Link href="https://github.com/jiwnchoi/Swipytics" isExternal>
            <Button leftIcon={<Icon as={GithubIcon} />} size={"xs"} variant={"link"} color={"gray"}>
              GitHub
            </Button>
          </Link>
          <Link href="https://idclab.skku.edu" isExternal>
            <Button
              variant={"link"}
              size={"xs"}
              leftIcon={<Icon as={LabelImportantIcon} />}
              color={"gray"}>
              <Image m={0} p={0} src={"/Swipytics/idclab.svg"} height={"10px"} />
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Center>
  );
}

export default memo(PlaceHolderImpl);
