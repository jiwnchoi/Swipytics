import { router } from "@api";
import { useLayout } from "@hooks";
import { type TChart, type TField } from "@shared/models";
import { sortDataFieldCallback } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function useDiscoverView() {
  const appendChart = useSessionsStore((state) => state.appendChart);
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

  const handleFieldClick = (field: TField) => {
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

  const isSelected = useCallback(
    (field: TField) => selectedFields.includes(field.name),
    [selectedFields],
  );

  const handleChartClick = useCallback(
    (chart: TChart) => {
      appendChart(chart).then(() => {
        if (mobile) setTabByName("charts");
        setSelectedFields([]);
      });
    },
    [appendChart, mobile, setSelectedFields, setTabByName],
  );

  return {
    loading,
    queriedCharts,
    handleFieldClick,
    handleChartClick,
    fields,
    isSelected,
    selectedFields,
  };
}
