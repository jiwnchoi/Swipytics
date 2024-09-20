import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FWriteFile = ({
  filename,
  fileBuffer,
}: {
  filename: string;
  fileBuffer: Uint8Array;
}) => Promise<void>;

async function writeFilePyodide({
  filename,
  fileBuffer,
}: {
  filename: string;
  fileBuffer: Uint8Array;
}) {
  const pyodide = await getPyodide();
  await pyodide.writeFile(filename, fileBuffer);
}

async function writeFileFetch({
  filename,
  fileBuffer,
}: {
  filename: string;
  fileBuffer: Uint8Array;
}) {
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append("file", blob, filename);
  await fetch("/api/writeFile", {
    method: "POST",
    body: formData,
  });
}

export default {
  pyodide: writeFilePyodide,
  server: writeFileFetch,
} as TEndpoint<FWriteFile>;
