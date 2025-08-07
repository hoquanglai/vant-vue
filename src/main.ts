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
import { DropdownItem, DropdownMenu, Popup, Switch } from "vant"

const app = createApp(App)

installPlugins(app)

app.use(pinia)
app.use(Popup)
app.use(router)
app.use(DropdownMenu)
app.use(DropdownItem)
app.use(Switch)

router.isReady().then(() => {
  app.mount("#app")
})
