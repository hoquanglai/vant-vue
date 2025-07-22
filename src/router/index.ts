import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import { registerNavigationGuard } from "@/router/guard"

const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH
const VITE_ROUTER_HISTORY = import.meta.env.VITE_ROUTER_HISTORY

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: "/403",
    component: () => import("@/pages/error/403.vue"),
    name: "403",
    meta: {
      title: "routes.403"
    }
  },
  {
    path: "/404",
    component: () => import("@/pages/error/404.vue"),
    name: "404",
    meta: {
      title: "routes.404"
    },
    alias: "/:pathMatch(.*)*"
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    name: "Login",
    meta: {
      title: "routes.login"
    }
  },
  {
    path: "/",
    component: () => import("@/pages/home/index.vue"),
    name: "Home",
    meta: {
      title: "routes.home",
      layout: {
        navBar: {
          showNavBar: false,
          showLeftArrow: false
        },
        tabbar: {
          showTabbar: true,
          icon: "home-o"
        }
      }
    }
  },
  {
    path: "/me",
    component: () => import("@/pages/me/index.vue"),
    name: "Me",
    meta: {
      title: "routes.me",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: false
        },
        tabbar: {
          showTabbar: true,
          icon: "user-o"
        },
        footer: true
      }
    }
  }
]

export const demoRoutes: RouteRecordRaw[] = [
  {
    path: "/keep-alive",
    component: () => import("@/pages/demo/keep-alive.vue"),
    name: "KeepAlive",
    meta: {
      title: "routes.keepAlive",
      keepAlive: true,
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  },
  {
    path: "/watermark",
    component: () => import("@/pages/demo/watermark.vue"),
    name: "Watermark",
    meta: {
      title: "routes.watermark",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  },
  {
    path: "/permission",
    component: () => import("@/pages/demo/permission.vue"),
    name: "Permission",
    meta: {
      title: "routes.permission",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  },
  {
    path: "/no-permission-page",
    component: () => {},
    name: "NoPermissionPage",
    meta: {
      title: "routes.noPermissionPage",
      roles: ["SuperAdmin"]
    }
  },
  {
    path: "/color",
    component: () => import("@/pages/demo/color.vue"),
    name: "Color",
    meta: {
      title: "routes.color",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  },
  {
    path: "/i18n",
    component: () => import("@/pages/demo/i18n.vue"),
    name: "I18n",
    meta: {
      title: "routes.i18n",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  }
]

export const emptyDemoRoutes: RouteRecordRaw[] = [
  {
    path: "/markdown",
    component: () => import("@/pages/demo/markdown.vue"),
    name: "Markdown",
    meta: {
      title: "routes.markdown",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  },
  {
    path: "/chart",
    component: () => import("@/pages/demo/chart.vue"),
    name: "Chart",
    meta: {
      title: "routes.chart",
      layout: {
        navBar: {
          showNavBar: true,
          showLeftArrow: true
        }
      }
    }
  }
]

export const router = createRouter({
  history: VITE_ROUTER_HISTORY === "hash"
    ? createWebHashHistory(VITE_PUBLIC_PATH)
    : createWebHistory(VITE_PUBLIC_PATH),
  routes: [...systemRoutes, ...routes, ...demoRoutes, ...emptyDemoRoutes]
})

registerNavigationGuard(router)
