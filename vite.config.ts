import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import pyodidePlugin from "vite-plugin-pyodide";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  base: "/Swipytics",
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
        enabled: true,
      },
      manifest: false,
    }),
  ],
});
