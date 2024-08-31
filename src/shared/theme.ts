import { type StyleFunctionProps, type ThemeConfig, extendTheme } from "@chakra-ui/react";
import { PRIMARY } from "./constants";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  components: {
    Button: {
      defaultProps: {
        size: "sm",
      },
    },
    Input: {
      defaultProps: {
        size: "sm",
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
      },
    }),
  },
});
