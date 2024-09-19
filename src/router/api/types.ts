import { type TChart, type TSession } from "../../shared/models";

export type API = {
  loadData: (filename: string, fileBuffer: Uint8Array) => Promise<TSession>;
  appendNextChart: () => Promise<TChart>;
  callAppendChart: (chart: TChart) => Promise<unknown>;
  browseCharts: (fieldNames: string[]) => Promise<TChart[]>;
};

/* PythonManifest와 완전히 동일한 경우
export type API = {
  [K in keyof PythonManifest]: PythonManifest[K] extends { args: infer A; returns: infer R }
    ? (args: A) => Promise<R>
    : never;
};
*/
