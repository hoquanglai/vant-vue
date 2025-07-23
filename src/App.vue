<script setup lang="ts">
import { useDark } from "@@/composables/useDark"
import Layout from "@/layout/index.vue"
import { useUserStore } from "@/pinia/stores/user"

const userStore = useUserStore()

const { isDark, initDark } = useDark()

const isLoading = computed(() => userStore.token && !userStore.fullName)

onMounted(() => {
  userStore.getInfo()
})

// watch(
//   () => userStore.token,
//   (newVal) => {
//     newVal && userStore.getInfo()
//   },
//   {
//     immediate: true
//   }
// )

initDark()
</script>

<template>
  <van-config-provider :theme="isDark ? 'dark' : 'light'" un-h-full>
    <!-- <van-loading v-if="isLoading" un-h-full un-flex-center>
      loading...
    </van-loading> -->
    <Layout />
  </van-config-provider>
</template>
