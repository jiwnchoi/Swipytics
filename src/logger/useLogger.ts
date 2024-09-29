import { useEffect } from "react";
import logger from "./logger";

export default function useLogger() {
  useEffect(() => {
    logger.initializeDB().then(() => {
      logger.attachEventListener();
    });
    return () => {
      logger.detachEventListener();
    };
  }, []);
}
