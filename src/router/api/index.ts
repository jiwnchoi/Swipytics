import pyodide from "./pyodide";
import server from "./server";
import { type API } from "./types";

const api: Record<"server" | "pyodide", API> = { server: server, pyodide: pyodide };

export default api;
