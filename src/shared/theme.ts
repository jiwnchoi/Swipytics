import { type StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { PRIMARY } from "./constants";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,
  components: {
    Button: {
      defaultProps: {
        size: "sm",
      },
    },
    Input: {
      defaultProps: {
        size: "sm",
        focusBorderColor: PRIMARY[200],
      },
      baseStyle: {
        field: {
          _focusVisible: {
            borderColor: PRIMARY[200],
          },
        },
      },
    },
    Select: {
      defaultProps: {
        size: "sm",
        focusBorderColor: PRIMARY[200],
      },
    },
    Tabs: {
      parts: ["tabpanel"],
      baseStyle: {
        tabpanel: {
          p: 0,
        },
      },
    },
    Card: {
      baseStyle: (props: StyleFunctionProps) => ({
        container: {
          bg: props.colorMode === "light" ? "white" : "gray.900",
        },
      }),
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        height: "100lvh",
        overflow: "hidden",
        overscrollBehavior: "none",
        bg: props.colorMode === "light" ? "gray.100" : "gray.800",
      },
      html: {
        height: "100lvh",
        overflow: "hidden",
        overscrollBehavior: "none",
        focusBorderColor: PRIMARY[200],
      },
    }),
  },
});
