import { Center, ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { theme } from "./theme";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Center w="full" minH="100vh" p={0} m={0}>
        <App />
      </Center>
    </ChakraProvider>
  </StrictMode>,
);
