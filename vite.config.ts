import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import VitePages from "vite-plugin-react-pages";
import { commonConfig } from "./vite.config.common";

export default defineConfig({
  ...commonConfig,

  optimizeDeps: {
    include: ["react-router-dom"],
  },

  plugins: [react(), VitePages()],
});
