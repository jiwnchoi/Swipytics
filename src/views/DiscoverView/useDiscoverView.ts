import { router } from "@api";
import { useLayout } from "@hooks";
import { type TChart, type TDataField } from "@shared/models";
import { sortDataFieldCallback } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function useDiscoverView() {
  const appendChart = useSessionsStore((state) => state.appendChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const charts = useSessionsStore((state) => state.charts);
  const data = useDataStore((state) => state.data);
  const filename = useDataStore((state) => state.filename);
  const dataFields = useSessionsStore((state) => state.fields);
  const selectedFields = useInteractionStore((state) => state.searchTargetFieldNames);
  const setSelectedFields = useInteractionStore((state) => state.setSearchTargetFieldNames);
  const setTabByName = useInteractionStore((state) => state.setTabByName);
  const { mobile } = useLayout();

  const { data: queriedCharts = [], isLoading: loading } = useQuery({
    queryKey: ["getCharts", filename, ...selectedFields.sort()],
    queryFn: async () => {
      if (selectedFields.length === 0 || !data) return [];
      return (await router.call("getCharts", { fieldNames: selectedFields })) ?? [];
    },
  });

  const handleFieldClick = (field: TDataField) => {
    if (selectedFields.includes(field.name)) {
      setSelectedFields((prev) => prev.filter((f) => f !== field.name));
    } else if (selectedFields.length < 3) {
      setSelectedFields((prev) => [...prev, field.name]);
    }
  };

  const fields = useMemo(
    () =>
      Array.from(dataFields)
        .filter((f) => f.type !== "name")
        .sort(sortDataFieldCallback),
    [dataFields],
  );

  const getTagVariant = useCallback(
    (field: TDataField) => (selectedFields.includes(field.name) ? "subtle" : "outline"),
    [selectedFields],
  );

  const handleChartClick = useCallback(
    async (chart: TChart) => {
      await appendChart(chart);
      if (mobile) setTabByName("charts");
      setCurrentChartIndex(charts.length - 1);
      setSelectedFields([]);
    },
    [appendChart, charts.length, mobile, setCurrentChartIndex, setSelectedFields, setTabByName],
  );

  return {
    loading,
    queriedCharts,
    handleFieldClick,
    handleChartClick,
    fields,
    getTagVariant,
  };
}
