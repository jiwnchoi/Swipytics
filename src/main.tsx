import { App } from "@app";
import { Center, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/rajdhani";
import { theme } from "@shared/theme";
import "@shared/theme/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { LoggerClient } from "@logger";
import { LoggerClientProvider } from "@logger/react";

import "./locales";

const queryClient = new QueryClient();
const loggerClient = new LoggerClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoggerClientProvider
        client={loggerClient}
        attachTo={window}
        eventTypes={["click", "scroll", "change"]}>
        <ChakraProvider theme={theme}>
          <Center flexDir={"column"} minH={"100dvh"} p={0} m={0} w={"full"}>
            <App />
          </Center>
        </ChakraProvider>
      </LoggerClientProvider>
    </QueryClientProvider>
  </StrictMode>,
);
