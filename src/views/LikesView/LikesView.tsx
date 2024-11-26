import { Button, Center, Flex, Heading, Icon, OrderedList, type FlexProps } from "@chakra-ui/react";
import { ChartItem } from "@components";
import { ArrowDown01Icon, ArrowUp01Icon, Sad02Icon } from "hugeicons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useLikesView from "./useLikesView";

interface LikesViewProps extends FlexProps {
  thumbnailSize?: number;
}

export default function LikesView({ thumbnailSize, ...props }: LikesViewProps) {
  const { preferredCharts, handleClickChart: handleClickBookmark } = useLikesView();
  const { t } = useTranslation();
  const [isNewest, setIsNewest] = useState(true);

  return (
    <Flex w="full" h="full" {...props}>
      {preferredCharts.length ? (
        <Flex direction="column" w="full">
          <Flex justifyContent="flex-end">
            <Button
              variant={"ghost"}
              size={"xs"}
              alignItems="center"
              leftIcon={<Icon as={isNewest ? ArrowUp01Icon : ArrowDown01Icon} boxSize={4} />}
              p={0}
              m={0}
              onClick={() => setIsNewest(!isNewest)}>
              {t(isNewest ? "bookmarks.sort_newest" : "bookmarks.sort_oldest")}
            </Button>
          </Flex>
          <OrderedList m={0} p={0} width="full" overflowY="auto">
            {(isNewest ? [...preferredCharts].reverse() : preferredCharts).map((chart) => (
              <ChartItem
                key={`bookmark-${chart.key}`}
                thumbnailSize={thumbnailSize}
                chart={chart}
                logClick={`move_to_preferred_chart-${chart.title}`}
                handleClick={handleClickBookmark}
              />
            ))}
          </OrderedList>
        </Flex>
      ) : (
        <Center w="full" flexDir={"column"} gap={8}>
          <Icon boxSize={16} as={Sad02Icon} />
          <Heading fontWeight={600}>{t("bookmarks.empty")}</Heading>
        </Center>
      )}
    </Flex>
  );
}
