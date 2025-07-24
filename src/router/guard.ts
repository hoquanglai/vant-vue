import type { Router } from "vue-router"
import { useTitle } from "@@/composables/useTitle"
import NProgress from "nprogress"
import { useKeepAliveStore } from "@/pinia/stores/keep-alive"
import { useUserStore } from "@/pinia/stores/user"

NProgress.configure({ showSpinner: false })

const { setTitle } = useTitle()

const LOGIN_PATH = `${import.meta.env.VITE_CAM_BASE_URL}/login/CPlatform?url-callback=dashboard`

const PROFILE_PATH = "/me"

export function registerNavigationGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    const user = userStore.user
    const requiresAuth = [PROFILE_PATH].includes(to.path)
    if (requiresAuth && (!user || Object.keys(user).length === 0)) {
      window.location.href = LOGIN_PATH
    }
    next()
  })

  router.afterEach((to) => {
    const keepAliveStore = useKeepAliveStore()
    if (to.path === LOGIN_PATH) keepAliveStore.delAllCachedRoutes()
    keepAliveStore.addCachedRoute(to)
    setTitle(to.meta.title)
    NProgress.done()
  })
}
