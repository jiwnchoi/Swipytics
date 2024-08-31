import { Button, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import "@fontsource/rajdhani";
import { GithubIcon, LabelImportantIcon } from "hugeicons-react";

export default function CopyRight() {
  return (
    <VStack w="full" color={"gray"} gap={1} mt={4} p={0}>
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
            Github
          </Button>
        </Link>
        <Link href="https://idclab.skku.edu" isExternal>
          <Button
            variant={"link"}
            size={"xs"}
            leftIcon={<Icon as={LabelImportantIcon} />}
            color={"gray"}>
            <Text fontFamily="Rajdhani" fontWeight={600} fontSize={"sm"}>
              IDC
            </Text>
            <Text fontFamily="Rajdhani" fontWeight={500} fontSize={"sm"}>
              Lab
            </Text>
          </Button>
        </Link>
      </Flex>
    </VStack>
  );
}
