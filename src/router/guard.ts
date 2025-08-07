import type { Router } from "vue-router"
import { useTitle } from "@@/composables/useTitle"
import NProgress from "nprogress"
import { useKeepAliveStore } from "@/pinia/stores/keep-alive"

NProgress.configure({ showSpinner: false })

const { setTitle } = useTitle()

const LOGIN_PATH = `${import.meta.env.VITE_CAM_BASE_URL}/login/CPlatform?url-callback=dashboard`

export function registerNavigationGuard(router: Router) {
  NProgress.start()
  router.afterEach((to) => {
    const keepAliveStore = useKeepAliveStore()
    if (to.path === LOGIN_PATH) keepAliveStore.delAllCachedRoutes()
    keepAliveStore.addCachedRoute(to)
    setTitle(to.meta.title)
    NProgress.done()
  })
}
