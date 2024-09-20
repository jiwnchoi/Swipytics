import { router } from "@router";
import { type TRouterLoadingStatus } from "@router/types";
import { useEffect, useState } from "react";

function useLoadingStatus() {
  const [loadingStatus, setLoadingStatus] = useState<TRouterLoadingStatus>(
    () => router.getLoadingStatus() ?? { loading: true, loadingPyodide: true, loadingServer: true },
  );

  useEffect(() => {
    const updateStatus = (newStatus: TRouterLoadingStatus) => {
      setLoadingStatus(newStatus);
    };

    router.on("loadingStatusChange", updateStatus);

    return () => {
      router.off("loadingStatusChange", updateStatus);
    };
  }, []);

  return loadingStatus;
}

export default useLoadingStatus;
