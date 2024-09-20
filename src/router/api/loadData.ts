import { type TSession } from "@shared/models";
import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FLoadData = ({
  filename,
  fileBuffer,
}: {
  filename: string;
  fileBuffer: Uint8Array;
}) => Promise<TSession>;

async function loadDataPyodide({
  filename,
  fileBuffer,
}: {
  filename: string;
  fileBuffer: Uint8Array;
}) {
  const pyodide = await getPyodide();
  await pyodide.writeFile(filename, fileBuffer);
  const data = await pyodide.callPythonFunction("loadData", { filename });
  return data;
}

async function loadDataFetch({
  filename,
  fileBuffer,
}: {
  filename: string;
  fileBuffer: Uint8Array;
}) {
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append("file", blob, filename);
  const response = await fetch("/api/loadData", {
    method: "POST",
    body: formData,
  });
  const data = (await response.json()) as TSession;
  return data;
}

export default {
  pyodide: loadDataPyodide,
  server: loadDataFetch,
} as TEndpoint<FLoadData>;
