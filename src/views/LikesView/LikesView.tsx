import { Center, Flex, Heading, Icon, OrderedList, type FlexProps } from "@chakra-ui/react";
import { ChartItem } from "@components";
import { Sad02Icon } from "hugeicons-react";
import { useTranslation } from "react-i18next";
import useLikesView from "./useLikesView";

export default function Bookmarks(props: FlexProps) {
  const { preferredCharts, handleClickBookmark } = useLikesView();
  const { t } = useTranslation();

  return (
    <Flex w="full" h="full" {...props}>
      {preferredCharts.length ? (
        <OrderedList m={0} p={0} width="full" overflowY="auto">
          {preferredCharts.map((chart) => (
            <ChartItem
              key={`bookmark-${chart.key}`}
              chart={chart}
              data-log-click={`preferred-chart-${chart.key}`}
              handleClick={handleClickBookmark}
            />
          ))}
        </OrderedList>
      ) : (
        <Center w="full" flexDir={"column"} gap={8}>
          <Icon boxSize={16} as={Sad02Icon} />
          <Heading fontWeight={600}>{t("bookmarks.empty")}</Heading>
        </Center>
      )}
    </Flex>
  );
}
