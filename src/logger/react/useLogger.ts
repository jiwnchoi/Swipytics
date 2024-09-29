import { useEffect } from "react";
import logger from "../logger";

export default function useLogger() {
  useEffect(() => {
    logger.initializeDB().then(() => {
      logger.attachEvent(window, ["click", "scroll"]);
    });
    return () => {
      logger.detachEvent(window, ["click", "scroll"]);
    };
  }, []);
}
