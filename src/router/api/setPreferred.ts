import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FSetPreferred = ({ key, preferred }: { key: string; preferred: boolean }) => Promise<void>;

async function setPreferredPyodide({ key, preferred }: { key: string; preferred: boolean }) {
  const pyodide = await getPyodide();
  await pyodide.callPythonFunction("setPreferred", { key, preferred });
}

async function setPreferredFetch({ key, preferred }: { key: string; preferred: boolean }) {
  await fetch("/api/setPreferred", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, preferred }),
  });
}

export default {
  pyodide: setPreferredPyodide,
  server: setPreferredFetch,
} as TEndpoint<FSetPreferred>;
