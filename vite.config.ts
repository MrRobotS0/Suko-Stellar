import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Nome do repositório no GitHub; ajuste conforme o seu
const repoName = "sistemasolar";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // define base para produção; em dev, Vite usa '/', mas base afeta build
  base: `/${repoName}/`,

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
