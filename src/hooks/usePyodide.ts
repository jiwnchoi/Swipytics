import { getPyodide } from "../workers/pyodide-initializer";
import { Pyodide } from "../workers/pyodide-worker-api";
import { useAsync } from "./useAsync";

/**
 * React hook to access the global pyodide object, after loading finishes.
 */
export const usePyodide = (): {
  pyodide: Pyodide | undefined;
  loading: boolean;
  error: Error | undefined;
} => {
  const {
    result: pyodide,
    loading,
    error,
  } = useAsync(async () => {
    const pyodide = await getPyodide();
    return pyodide;
  }, []);

  return { pyodide, loading, error };
};