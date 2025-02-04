import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // analyzer()
  ],
  resolve: {
    alias: {
      "@icons": "/src/components/icons.tsx",
      "@components": "/src/components",
      "@contexts": "/src/contexts",
      "@layouts": "/src/layouts",
      "@hooks": "/src/hooks",
      "@apiaxios": "/src/apiaxios",
      "@*": "/src/*",
    },
  },
   build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // return "nodemodules";
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      chunkSizeWarningLimit: 500,
    },
});
