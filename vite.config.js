import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "~": "/src",
      },
    },
    server: {
      host: true,
    },
  };
});
