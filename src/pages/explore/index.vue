<script setup lang="ts">
import NoticeBar from "../demo/components/NoticeBar.vue"

defineOptions({
  name: "KeepAlive"
})

const value = ref<string>("")
</script>

<template>
  <div un-mb-20px>
    <NoticeBar text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
    <van-cell-group inset un-mt-20px>
      <van-field v-model="value" placeholder="Explose" />
    </van-cell-group>
  </div>
</template>
