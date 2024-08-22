import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  base: "/Swipytics",
  plugins: [
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
      manifest: {
        name: "Swipytics",
        short_name: "Swipytics",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
  ],
});
