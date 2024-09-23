import type api from "./routes";

export type TRouterLoadingStatus = {
  loadingPyodide: boolean;
  loadingServer: boolean;
  loading: boolean;
};

export type TRouterEvent = {
  loadingStatusChange: TRouterLoadingStatus;
};
export type TEndpointType = typeof api;
export type TEndpointKey = keyof TEndpointType;
export type TMethodType = "pyodide" | "server";

export type TEndpointFunction<
  E extends TEndpointKey,
  M extends TMethodType,
> = E extends TEndpointKey
  ? M extends keyof TEndpointType[E]
    ? TEndpointType[E][M]
    : never
  : never;

export type TEndpointArgs<E extends TEndpointKey, M extends TMethodType> = Parameters<
  TEndpointFunction<E, M>
>[0];

export type TEndpointReturn<E extends TEndpointKey, M extends TMethodType> = ReturnType<
  TEndpointFunction<E, M>
>;
