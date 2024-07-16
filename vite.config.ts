import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), basicSsl()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@contexts": "/src/contexts",
      "@layouts": "/src/layouts",
      "@hooks": "/src/hooks",
      "@shadcn": "/src/components/Shadcn",
      "@apiaxios": "/src/apiaxios",
      // Add more aliases as needed
    },
  },
});
