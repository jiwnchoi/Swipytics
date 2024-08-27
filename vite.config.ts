import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import pyodidePlugin from "./plugin";

export default defineConfig({
  server: {
    host: "0.0.0.0",
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
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 1024,
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      manifest: false,
    }),
  ],
});
