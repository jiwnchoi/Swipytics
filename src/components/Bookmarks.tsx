import { OrderedList, TabPanel } from "@chakra-ui/react";
import { useBookmarks } from "@hooks";
import ChartItem from "./ChartItem";

export default function Bookmarks({ ...props }) {
  const { preferredCharts, handleClickBookmark } = useBookmarks();

  return (
    <TabPanel display="flex" flexDirection="column" height="full" {...props}>
      <OrderedList m={0} p={0} width="full" overflowY="auto">
        {preferredCharts.map((chart) => (
          <ChartItem key={`bookmark-${chart.key}`} chart={chart} onClick={handleClickBookmark} />
        ))}
      </OrderedList>
    </TabPanel>
  );
}
