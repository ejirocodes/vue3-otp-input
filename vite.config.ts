import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path, { resolve } from "node:path";
import pkg from "./package.json";
import { transform } from "esbuild";

function minifyEs() {
  return {
    name: "minifyEs",
    renderChunk: {
      order: "post",
      async handler(code, chunk, outputOptions) {
        if (
          outputOptions.format === "es" &&
          chunk.fileName.endsWith(".min.js")
        ) {
          return await transform(code, { minify: true });
        }
        return code;
      },
    },
  };
}

export default defineConfig({
  plugins: [vue(), dts(), minifyEs()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Vue3OtpInput",
      formats: ["es", "cjs", "umd", "esm"],
      fileName: (format) =>
        ({
          es: `${pkg.name}.js`,
          esm: `${pkg.name}.min.js`,
          cjs: `${pkg.name}.cjs`,
          umd: `${pkg.name}.umd.cjs`,
        }[format]),
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
    port: 2321,
  },
});
