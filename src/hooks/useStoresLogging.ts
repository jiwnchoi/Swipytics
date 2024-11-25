import { useLoggerClient } from "@logger/react";
import { getDifferences } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";
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
      const diff = getDifferences(pickedState, pickedPrevState);
      logger.log("data-store", "state", diff);
    });

    const unSubInteractionStore = useInteractionStore.subscribe((state, prevState) => {
      const pickedState = pickBy(state, (value) => typeof value !== "function");
      const pickedPrevState = pickBy(prevState, (value) => typeof value !== "function");
      if (isEqual(pickedState, pickedPrevState)) return;
      const diff = getDifferences(pickedState, pickedPrevState);
      if (!diff.length) return;
      logger.log("interaction-store", "state", diff);
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
      const diff = getDifferences(pickedState, pickedPrevState);
      if (!diff.length) return;
      logger.log("session-store", "state", getDifferences(pickedState, pickedPrevState));
    });

    return () => {
      unSubDataStore();
      unSubInteractionStore();
      unSubSessionStore();
    };
  }, [logger]);
}

export default useStoresLogging;
