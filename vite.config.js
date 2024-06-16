import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path"; // Tambahkan ini

export default defineConfig({
  plugins: [nodePolyfills(), react(), svgr()],
  base: "/flugelnime/",
  resolve: {
    alias: {
      "source-map-js": path.resolve(__dirname, "node_modules/source-map-js"),
      postcss: path.resolve(__dirname, "node_modules/postcss"),
    },
  },
});
