export type LoadingStatus = {
  loadingPyodide: boolean;
  loadingServer: boolean;
  loading: boolean;
};

export type Events = {
  loadingStatusChange: LoadingStatus;
};
