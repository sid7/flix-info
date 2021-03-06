import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { VitePWA } from "vite-plugin-pwa";
import { config } from "./pwa-config";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8006,
  },
  plugins: [
    react(),
    Icons({
      compiler: "jsx",
      jsx: "react",
      customCollections: {
        "my-icons": FileSystemIconLoader("./assets/icons"),
      },
      iconCustomizer(_, __, props) {
        props["aria-hidden"] = "true";
        props.focusable = "false";
        props.role = "img";
        props.height = "1em";
        props.width = "1.25em";
      },
    }),
    VitePWA(config),
  ],
});
