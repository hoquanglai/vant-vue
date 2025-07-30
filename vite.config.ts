/// <reference types="vitest/config" />

import { resolve } from "node:path"
import { VantResolver } from "@vant/auto-import-resolver"
import legacy from "@vitejs/plugin-legacy"
import vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { defineConfig, loadEnv } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import svgLoader from "vite-svg-loader"

// Vite configuration: https://vitejs.dev/config
export default defineConfig(({ mode }) => {
  const {
    VITE_PUBLIC_PATH,
    VITE_APP_TITLE,
    VITE_PWA_DESCRIPTION,
    VITE_PWA_THEME_COLOR
  } = loadEnv(mode, process.cwd(), "") as ImportMetaEnv

  return {
    base: VITE_PUBLIC_PATH,

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@@": resolve(__dirname, "src/common")
      }
    },

    server: {
      host: true,
      port: 3333,
      strictPort: false,
      open: true,
      watch: {
        usePolling: true,
        interval: 100
      },
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          ws: false,
          changeOrigin: true,
          secure: false
        }
      },
      cors: false,
      warmup: {
        clientFiles: [
          "./src/http/**/*.*",
          "./src/pinia/**/*.*",
          "./src/router/**/*.*"
        ]
      }
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"]
          }
        }
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048
    },

    esbuild:
      mode === "development"
        ? undefined
        : {
            pure: ["console.log"],
            drop: ["debugger"],
            legalComments: "none"
          },

    optimizeDeps: {
      include: ["vant/es/*/style/index"]
    },

    css: {
      preprocessorMaxWorkers: true
    },

    plugins: [
      vue(),

      legacy(),

      svgLoader({
        defaultImport: "url",
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      }),

      UnoCSS(),

      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: "types/auto/auto-imports.d.ts",
        resolvers: [VantResolver()]
      }),

      Components({
        dts: "types/auto/components.d.ts",
        resolvers: [VantResolver()]
      }),

      VitePWA({
        includeAssets: ["favicon.png", "apple-touch-icon.png"],
        manifest: {
          name: VITE_APP_TITLE,
          short_name: VITE_APP_TITLE,
          description: VITE_PWA_DESCRIPTION,
          theme_color: VITE_PWA_THEME_COLOR,
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: ["any", "maskable"]
            }
          ]
        }
      })
    ],

    test: {
      include: ["tests/**/*.test.{ts,js}"],
      environment: "happy-dom",
      server: {
        deps: {
          inline: ["vant"]
        }
      }
    }
  }
})
