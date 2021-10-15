import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8006,
  },
  plugins: [react(), Icons({ compiler: "jsx", jsx: "react" })],
});
