import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig } from "vite"
import styleImport from "vite-plugin-style-import"

export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: "vant",
                    esModule: true,
                    resolveStyle: (name) => `vant/es/${name}/style/index`,
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            "@": path.resolve(__dirname, "src"),
            "~": path.resolve(__dirname, "src/views"),
            "sockjs-client": "sockjs-client/dist/sockjs",
        },
    },
})
