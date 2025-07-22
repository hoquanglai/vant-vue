import type { App } from "vue"
import { createI18n } from "vue-i18n"
import { messages } from "../locales/index"

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: messages
})

export function installI18n(app: App) {
  console.log("Installing i18n plugin with messages:", messages);
  
  app.use(i18n)
}
