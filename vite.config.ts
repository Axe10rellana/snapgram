import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import VitePages from "vite-plugin-react-pages";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: {
    include: ["react-router-dom"],
  },

  plugins: [react(), VitePages()],
});
