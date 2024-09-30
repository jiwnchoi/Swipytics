import { useLoggerClient } from "@logger/react";
import { getDifferences } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore, useSettingsStore } from "@stores";
import { pick, pickBy } from "es-toolkit";
import { useEffect } from "react";
import { isEqual } from "vega-lite";

function useStoresLogging() {
  const logger = useLoggerClient();

  useEffect(() => {
    const unSubDataStore = useDataStore.subscribe((state, prevState) => {
      const pickedState = pick(state, ["filename"]);
      const pickedPrevState = pick(prevState, ["filename"]);

      if (isEqual(pickedState, pickedPrevState)) return;
      logger.log("data-store", "state", getDifferences(pickedState, pickedPrevState));
    });

    const unSubInteractionStore = useInteractionStore.subscribe((state, prevState) => {
      const pickedState = pickBy(state, (value) => typeof value !== "function");
      const pickedPrevState = pickBy(prevState, (value) => typeof value !== "function");
      if (isEqual(pickedState, pickedPrevState)) return;
      logger.log("interaction-store", "state", getDifferences(pickedState, pickedPrevState));
    });

    const unSubSessionStore = useSessionsStore.subscribe((state, prevState) => {
      const pickedState = pick(
        {
          ...state,
          charts: state.charts.map((chart) =>
            pick(chart, ["key", "title", "preferred", "timestamp"]),
          ),
        },
        ["charts", "filename", "timestamp", "currentChartIndex"],
      );

      const pickedPrevState = pick(
        {
          ...prevState,
          charts: prevState.charts.map((chart) =>
            pick(chart, ["key", "title", "preferred", "timestamp"]),
          ),
        },
        ["charts", "filename", "timestamp", "currentChartIndex"],
      );

      if (isEqual(pickedState, pickedPrevState)) return;
      logger.log("session-store", "state", getDifferences(pickedState, pickedPrevState));
    });

    const unSubSettingsStore = useSettingsStore.subscribe((state, prevState) => {
      const pickedState = pickBy(state, (value) => typeof value !== "function");
      const pickedPrevState = pickBy(prevState, (value) => typeof value !== "function");
      if (isEqual(pickedState, pickedPrevState)) return;
      logger.log("settings-store", "state", getDifferences(pickedState, pickedPrevState));
    });

    return () => {
      unSubDataStore();
      unSubInteractionStore();
      unSubSessionStore();
      unSubSettingsStore();
    };
  }, [logger]);
}

export default useStoresLogging;
