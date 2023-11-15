import path from "path";

export const commonConfig = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
