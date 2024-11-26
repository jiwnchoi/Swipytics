import { useLoggerClient } from "@logger/react";
import type { TChart } from "@shared/models";
import { getDifferences } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";
import { debounce, pick, pickBy } from "es-toolkit";
import { useEffect } from "react";
import { isEqual } from "vega-lite";

const saveState = () => {
  const charts = useSessionsStore.getState().charts;
  const filteredCharts = charts.map((chart) => ({
    title: chart.title,
    n_fields: chart.fields.length,
    preferred: chart.preferred,
    generatedBy: chart.generatedBy,
  }));

  const prevCharts = JSON.parse(
    localStorage.getItem(useSessionsStore.getState().filename) ?? "[]",
  ) as TChart[];
  if (filteredCharts.length >= prevCharts.length) {
    localStorage.setItem(useSessionsStore.getState().filename, JSON.stringify(filteredCharts));
  }
};

function useStoresLogging() {
  const logger = useLoggerClient();

  useEffect(() => {
    const unSubDataStore = useDataStore.subscribe((state, prevState) => {
      const pickedState = pick(state, ["filename"]);
      const pickedPrevState = pick(prevState, ["filename"]);

      if (isEqual(pickedState, pickedPrevState)) return;
      const diff = getDifferences(pickedState, pickedPrevState);
      logger.log("data_store", "state", diff);
    });

    const unSubInteractionStore = useInteractionStore.subscribe((state, prevState) => {
      const pickedState = pickBy(state, (value) => typeof value !== "function");
      const pickedPrevState = pickBy(prevState, (value) => typeof value !== "function");
      if (isEqual(pickedState, pickedPrevState)) return;
      const diff = getDifferences(pickedState, pickedPrevState);
      if (!diff.length) return;
      logger.log("interaction_store", "state", diff);
    });

    const unSubSessionStore = useSessionsStore.subscribe((state, prevState) => {
      const pickedState = pick(
        {
          ...state,
          charts: state.charts.map((chart) =>
            pick(chart, ["title", "preferred", "timestamp", "generatedBy"]),
          ),
        },
        ["charts", "filename", "timestamp", "currentChartIndex"],
      );

      const pickedPrevState = pick(
        {
          ...prevState,
          charts: prevState.charts.map((chart) =>
            pick(chart, ["title", "preferred", "timestamp", "generatedBy"]),
          ),
        },
        ["charts", "filename", "timestamp", "currentChartIndex"],
      );

      if (isEqual(pickedState, pickedPrevState)) return;
      const diff = getDifferences(pickedState, pickedPrevState);
      if (!diff.length) return;
      logger.log("session_store", "state", getDifferences(pickedState, pickedPrevState));
    });

    debounce(saveState, 1000)();

    return () => {
      unSubDataStore();
      unSubInteractionStore();
      unSubSessionStore();
    };
  }, [logger]);
}

export default useStoresLogging;
