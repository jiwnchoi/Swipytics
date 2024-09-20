import { type TSession } from "@shared/models";
import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FLoadSession = ({ session }: { session: TSession }) => Promise<TSession>;

async function loadSessionPyodide({ session }: { session: TSession }) {
  const pyodide = await getPyodide();
  return pyodide.callPythonFunction("loadSession", { session });
}

async function loadSessionFetch({ session }: { session: TSession }) {
  const response = await fetch("/api/loadSession", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(session),
  });
  return (await response.json()) as TSession;
}

export default {
  pyodide: loadSessionPyodide,
  server: loadSessionFetch,
} as TEndpoint<FLoadSession>;
