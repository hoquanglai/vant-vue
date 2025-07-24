<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const route = useRoute()

const router = useRouter()

const title = computed(() => t(route.meta.title as string) || "Default Title")

const showLeftArrow = computed(() => route.meta.layout?.navBar?.showLeftArrow)

function onClickLeft() {
  if (window.history.state?.back)
    history.back()
  else
    router.replace("/")
}
</script>

<template>
  <van-nav-bar
    :title="title"
    :left-arrow="showLeftArrow"
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />
</template>
