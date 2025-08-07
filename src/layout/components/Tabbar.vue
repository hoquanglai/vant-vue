<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { useUserStore } from "@/pinia/stores/user"

const userStore = useUserStore()

const { t } = useI18n()
const router = useRouter()

function isImage(icon?: string) {
  return !!icon && /\.(png|jpe?g|gif|svg)$/.test(icon)
}

const tabbarItemList = computed(() => {
  const routes = router.getRoutes()
  const { user } = userStore
  return routes
    .filter(route => route.meta.layout?.tabbar?.showTabbar)
    .map((route) => {
      // Lấy icon mặc định trong meta
      // Nếu route là /me và user có avatar thì dùng avatar
      const isLogin = route.path === "/me" && Object.keys(user).length !== 0
      console.log(isLogin)
      let iconToUse = route.meta.layout?.tabbar?.icon
      let titleToUse = t(route.meta.title as string)
      if (isLogin) {
        iconToUse = user?.avatar || "https://c-platform-svc.up4d-group.com/assets/images/profile/default-avatar.png"
        titleToUse = t("routes.profile")
      }

      return {
        title: titleToUse,
        icon: iconToUse,
        path: route.path
      }
    })
})
</script>

<template>
  <van-tabbar
    route
    fixed
    placeholder
    safe-area-inset-bottom
    class="tabbar"
  >
    <van-tabbar-item
      v-for="item in tabbarItemList"
      :key="item.path"
      :to="item.path"
      replace
      v-bind="isImage(item.icon) ? {} : { icon: item.icon }"
    >
      <template v-if="isImage(item.icon)" #icon>
        <img
          :src="item.icon"
          alt=""
        >
      </template>
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style>
.tabbar .van-icon__image {
  border-radius: 50%;
  object-fit: cover;
  width: 22px;
  height: 22px;
}
</style>
