/* eslint-disable perfectionist/sort-imports */

// core
import { pinia } from "@/pinia"
import { router } from "@/router"
import { installPlugins } from "@/plugins"
import App from "@/App.vue"
// vant
import "@vant/touch-emulator"
// css
import "normalize.css"
import "nprogress/nprogress.css"
import "@@/assets/styles/index.css"
import "virtual:uno.css"

const app = createApp(App)

installPlugins(app)

app.use(pinia).use(router)

router.isReady().then(() => {
  app.mount("#app")
})
