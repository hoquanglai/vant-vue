import type { Router } from "vue-router"
import { useTitle } from "@@/composables/useTitle"
import { getToken } from "@@/utils/cache/cookies"
import NProgress from "nprogress"
import { useKeepAliveStore } from "@/pinia/stores/keep-alive"
import { useUserStore } from "@/pinia/stores/user"
import { isWhiteList } from "@/router/whitelist"

NProgress.configure({ showSpinner: false })

const { setTitle } = useTitle()

const LOGIN_PATH = "/login"

export function registerNavigationGuard(router: Router) {
  router.beforeEach((to, _from) => {
    NProgress.start()
    const userStore = useUserStore()
    if (!getToken()) {
      if (isWhiteList(to)) return true
      return LOGIN_PATH
    }
    if (to.path === LOGIN_PATH) return "/"
    if (to.meta.roles ? userStore.roles.some(role => to.meta.roles!.includes(role)) : true) return true
    return "/403"
  })
  router.afterEach((to) => {
    const keepAliveStore = useKeepAliveStore()
    if (to.path === LOGIN_PATH) keepAliveStore.delAllCachedRoutes()
    keepAliveStore.addCachedRoute(to)
    setTitle(to.meta.title)
    NProgress.done()
  })
}
