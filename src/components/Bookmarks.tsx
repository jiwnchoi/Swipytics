import { Center, ListItem, OrderedList, TabPanel } from "@chakra-ui/react";
import { useBookmarks, useLayout } from "@hooks";
import { useTranslation } from "react-i18next";
import ChartItem from "./ChartItem";

export default function Bookmarks({ ...props }) {
  const { preferredCharts, handleClickBookmark } = useBookmarks();
  const { tabPanelHeight } = useLayout();
  const { t } = useTranslation();

  return (
    <TabPanel display="flex" flexDirection="column" height="full" h={tabPanelHeight} {...props}>
      <OrderedList m={0} p={0} width="full" overflowY="auto">
        {preferredCharts.length ? (
          preferredCharts.map((chart) => (
            <ChartItem
              key={`bookmark-${chart.key}`}
              chart={chart}
              data-log-click={`preferred-chart-${chart.key}`}
              onClick={handleClickBookmark}
            />
          ))
        ) : (
          <ListItem>
            <Center minH={400}>{t("bookmarks.empty")}</Center>
          </ListItem>
        )}
      </OrderedList>
    </TabPanel>
  );
}
