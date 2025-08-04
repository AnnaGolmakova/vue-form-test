import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  base: "https://annagolmakova.github.io/vue-form-test/",
  plugins: [vue(), svgLoader()],
});
