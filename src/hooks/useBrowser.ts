import { useAppendChart, useFieldNameMatches } from "@hooks";
import { MAX_N_SELECTED_FIELDS } from "@shared/constants";
import { useDataStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { browseCharts } from "../stores/useSessionsStore";

export default function useBrowser() {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestionCursorIndex, setSuggestionCursorIndex] = useState<number>(0);
  const filename = useDataStore((state) => state.filename);
  const data = useDataStore((state) => state.data);

  useEffect(() => {
    setSuggestionCursorIndex(0);
  }, [inputValue]);

  const { data: browsedCharts = [], isLoading: loading } = useQuery({
    queryKey: ["browseCharts", filename, ...selectedFields.sort().join("&")],
    queryFn: async () => {
      if (selectedFields.length === 0) return [];
      const charts = await browseCharts(selectedFields);
      if (!charts || !data) return charts;
      return charts;
    },
  });

  const fieldNameMatches = useFieldNameMatches(inputValue);
  const { appendChart } = useAppendChart();

  useEffect(() => {
    if (selectedFields.length >= MAX_N_SELECTED_FIELDS) {
      setInputValue("");
    }
  }, [selectedFields]);

  const inputDisabled = selectedFields.length >= MAX_N_SELECTED_FIELDS;

  const handleFieldSelection = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
    setInputValue("");
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.stopPropagation();
    }
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      if (fieldNameMatches.length > 0)
        setSuggestionCursorIndex((prev) =>
          e.key === "ArrowDown"
            ? Math.min(prev + 1, fieldNameMatches.length - 1)
            : Math.max(prev - 1, 0),
        );
    } else if (e.key === "Enter") {
      if (
        selectedFields.length <= MAX_N_SELECTED_FIELDS &&
        fieldNameMatches.length > suggestionCursorIndex
      ) {
        handleFieldSelection(fieldNameMatches[suggestionCursorIndex].item);
      }
    }
  };

  return {
    browsedCharts,
    inputDisabled,
    loading,
    fieldNameMatches,
    inputValue,
    setInputValue,
    selectedFields,
    handleFieldSelection,
    appendChart,
    suggestionCursorIndex,
    handleKeydown,
  };
}
