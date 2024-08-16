import { Center, ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { theme } from "./theme";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Center id="eelll" w="full" minH={"100lvh"} p={0} m={0} maxH={"100lvh"}>
        <App />
      </Center>
    </ChakraProvider>
  </StrictMode>,
);
