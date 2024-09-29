import { Center, ListItem, OrderedList, TabPanel } from "@chakra-ui/react";
import { useBookmarks } from "@hooks";
import { useTranslation } from "react-i18next";
import ChartItem from "./ChartItem";

export default function Bookmarks({ ...props }) {
  const { preferredCharts, handleClickBookmark } = useBookmarks();
  const { t } = useTranslation();

  return (
    <TabPanel display="flex" flexDirection="column" height="full" {...props}>
      <OrderedList m={0} p={0} width="full" overflowY="auto">
        {preferredCharts.length ? (
          preferredCharts.map((chart) => (
            <ChartItem key={`bookmark-${chart.key}`} chart={chart} onClick={handleClickBookmark} />
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
