import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/local": {
        target: "https://api.check-out.paperst.ar/",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/local/, "");
        },
      },
    },
  },
});
