<template>
  <div un-py-16px>
    <van-cell-group un-mb-8px>
      <van-cell size="large" is-link center @click="onClick">
        <template #title>
          <div un-flex-y-center un-gap-16px>
            <van-image :src="faviconUrl" un-w-44px un-h-44px />
            <div un-flex un-flex-col>
              <span un-fw-600>{{ userStore.username }}</span>
              <span un-text-14px un-color-hex-969799>{{ $t('profile.subtitle') }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group un-mb-8px>
      <van-cell :title="$t('profile.darkMode')" center>
        <template #right-icon>
          <van-switch :model-value="isDark" size="min(5.333vw, 40px)" @click="changeDark" />
        </template>
      </van-cell>
      <van-cell :title="$t('profile.documentation')" is-link url="https://juejin.cn/column/7472609448201666599" />
      <van-cell :title="$t('profile.github')" is-link url="https://github.com/un-pany/mobvue" />
      <van-cell :title="$t('profile.donate')" is-link url="https://github.com/un-pany/mobvue/issues/1" />
      <van-cell :title="$t('profile.pay')" is-link url="https://github.com/un-pany/mobvue/issues/2" />
      <van-cell :title="$t('profile.group')" is-link url="https://github.com/un-pany/mobvue/issues/3" />
    </van-cell-group>

    <van-button block @click="onLogout" un-b-0px un-rounded-0px>
      {{ $t('profile.logout') }}
    </van-button>
  </div>
</template>

<script setup lang="ts">
import { useDark } from "@@/composables/useDark"
import { useUserStore } from "@/pinia/stores/user"
import faviconUrl from "/favicon.png?url"
import { useRouter } from "vue-router"
import { showToast } from "vant"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const { isDark, changeDark } = useDark()

function onClick() {
  showToast(t("profile.toast"))
}

function onLogout() {
  userStore.resetToken()
  router.push("/login")
}
</script>
