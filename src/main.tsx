import { App } from "@app";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { theme } from "@shared/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@shared/theme/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
const queryClient = new QueryClient();

import "./locales";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Center flexDir={"column"} minH={"100dvh"} p={0} m={0} w={"full"}>
          <App />
        </Center>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
