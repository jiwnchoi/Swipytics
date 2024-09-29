import { useDataStore, useInteractionStore, useSessionsStore, useSettingsStore } from "../stores";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractNonFunctionValues = (state: Record<string, any>) => {
  const nonFunctionValues = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(state).filter(([_, value]) => typeof value !== "function"),
  ) as Partial<typeof state>;
  return nonFunctionValues;
};

const logKeyToLogData: Record<string, object> = {
  bookmark: { filename: useDataStore.getState().filename },
  "load-demo": {},
};

const getLogData = (key: string) =>
  logKeyToLogData[key] || {
    ...extractNonFunctionValues(useDataStore.getState()),
    ...extractNonFunctionValues(useInteractionStore.getState()),
    ...extractNonFunctionValues(useSessionsStore.getState()),
    ...extractNonFunctionValues(useSettingsStore.getState()),
  };

export default getLogData;
