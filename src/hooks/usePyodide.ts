import { useQuery } from "@tanstack/react-query";
import { getPyodide } from "@workers";

export default function usePyodide() {
  const { isLoading: loadingPyodide, data: pyodide } = useQuery({
    queryKey: ["loadPyodide"],
    queryFn: getPyodide,
  });

  return { loadingPyodide, pyodide };
}
