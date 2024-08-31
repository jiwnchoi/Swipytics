import { App } from "@app";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Center flexDir={"column"} minH={"100lvh"} p={0} m={0} maxH={"100lvh"}>
          <App />
        </Center>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
