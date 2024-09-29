import { createContext, type ReactNode, useContext, useEffect } from "react";
import { type LoggerClient } from "..";

interface LoggerProviderProps {
  client: LoggerClient;
  attachTo: HTMLElement | Window;
  eventTypes: string[];
  children?: ReactNode;
}

export const LoggerClientContext = createContext<LoggerClient | undefined>(undefined);

export function LoggerClientProvider({
  client,
  eventTypes = [],
  attachTo = window,
  children,
}: LoggerProviderProps) {
  useEffect(() => client.registerLogger(eventTypes, attachTo), [attachTo, eventTypes, client]);

  return <LoggerClientContext.Provider value={client}>{children}</LoggerClientContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoggerClient(loggerClient?: LoggerClient) {
  const client = useContext(LoggerClientContext);

  if (loggerClient) {
    return loggerClient;
  }

  if (!client) {
    throw new Error("useLogger must be used within a LoggerProvider");
  }
  return client;
}
