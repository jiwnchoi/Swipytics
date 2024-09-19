import { useEffect, useState } from "react";
import { getRouter, initRouter } from "../router";
import { type LoadingStatus } from "../router/types";

function useLoadingStatus() {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(() => {
    const routerInstance = getRouter();
    return routerInstance
      ? routerInstance.getLoadingStatus()
      : { loading: true, loadingPyodide: true, loadingServer: true };
  });

  useEffect(() => {
    let isMounted = true;

    const updateStatus = (newStatus: LoadingStatus) => {
      if (isMounted) {
        setLoadingStatus(newStatus);
      }
    };

    async function subscribeToRouter() {
      const routerInstance = await initRouter();
      updateStatus(routerInstance.getLoadingStatus());
      routerInstance.on("loadingStatusChange", updateStatus);
    }

    subscribeToRouter();

    return () => {
      isMounted = false;
      const routerInstance = getRouter();
      if (routerInstance) {
        routerInstance.off("loadingStatusChange", updateStatus);
      }
    };
  }, []);

  return loadingStatus;
}

export default useLoadingStatus;
