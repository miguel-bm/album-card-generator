import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cloudflare({
      config: {
        assets: { binding: "ASSETS", not_found_handling: "single-page-application" },
      },
    }),
  ],
});
