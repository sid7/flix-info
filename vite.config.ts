import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import { VitePWA } from "vite-plugin-pwa";
import { config } from "./pwa-config";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8006,
  },
  plugins: [react(), Icons({ compiler: "jsx", jsx: "react" }), VitePWA(config)],
});
