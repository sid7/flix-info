import type { VitePWAOptions } from "vite-plugin-pwa";

export const config: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: [
    "safari-pinned-tab.svg",
    "favicon-32x32.png",
    "robots.txt",
    "apple-touch-icon.png",
  ],
  manifest: {
    name: "Flix Info",
    short_name: "Flix Info",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    theme_color: "#607d8b",
    background_color: "#0d1117",
    lang: "en",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};
