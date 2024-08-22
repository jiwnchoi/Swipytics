import { App } from "@app";
import { Center, ChakraProvider, Heading, Spinner, VStack } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
const queryClient = new QueryClient();

function Fallback() {
  return (
    <VStack gap={12}>
      <Heading>Initializing System...</Heading>
      <Spinner size={"xl"} />
    </VStack>
  );
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Center w="full" minH={"100lvh"} p={0} m={0} maxH={"100lvh"}>
          {/* <Suspense fallback={<Fallback />}>
            <LazyApp />
          </Suspense> */}
          <App />
        </Center>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
