import { useSettingsStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { getPyodide } from "@workers";

export default function usePyodide() {
  const python = useSettingsStore(state => state.python);

  const { isLoading: loadingPyodide, data: pyodide } = useQuery({
    queryKey: ["loadPyodide", python],
    queryFn: async () => {
      if (python === "server") return null;
      return await getPyodide();
    },
  });

  return { loadingPyodide: python === "pyodide" && loadingPyodide, pyodide };
}
