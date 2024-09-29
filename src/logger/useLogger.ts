import { useEffect } from "react";
import logger from "./logger";

export default function useLogger() {
  useEffect(() => {
    logger.initializeDB().then(() => {
      logger.attatchEventListener();
    });
    return () => {
      logger.detachEventListener();
    };
  }, []);
}
