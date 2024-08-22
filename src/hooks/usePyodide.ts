import { useQuery } from "@tanstack/react-query";
import { loadEnvs } from "@workers";

export default function usePyodide() {
  const { isLoading: loadingPyodide, data: pyodide } = useQuery({
    queryKey: ["loadPyodide"],
    queryFn: loadEnvs,
  });

  return { loadingPyodide, pyodide };
}
