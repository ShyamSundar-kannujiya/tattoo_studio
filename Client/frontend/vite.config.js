import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      manifest: {
        name: "UP 50 tattoo studio",
        short_name: "UP 50",
        description: "UP 50 tattoo studio",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/Logo1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Logo1.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
});
