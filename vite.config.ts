import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pyodidePlugin from "./plugin";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    server: {
      host: "0.0.0.0",
      proxy: isDevelopment
        ? {
            "/api": "http://localhost:8000",
          }
        : undefined,
    },
    base: "/Swipytics",
    worker: {
      format: "es",
      plugins: () => [
        pyodidePlugin({
          base: "api",
          entryPoint: "app.py",
        }),
      ],
    },
    plugins: [
      pyodidePlugin({
        base: "api",
        entryPoint: "app.py",
      }),
      react(),
      tsconfigPaths(),
    ],
  };
});
