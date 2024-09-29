import { useDataStore, useInteractionStore, useSessionsStore, useSettingsStore } from "../stores";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractValues = (state: Record<string, any>) => {
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
    ...extractValues(useDataStore.getState()),
    ...extractValues(useInteractionStore.getState()),
    ...extractValues(useSessionsStore.getState()),
    ...extractValues(useSettingsStore.getState()),
  };

export default getLogData;
