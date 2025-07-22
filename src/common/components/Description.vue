<script setup lang="ts">
import { useI18n } from "vue-i18n"

interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: "home.text"
})

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 un-flex-y-center>
      <img src="/favicon.png" un-w-38px un-h-38px>
      <span un-ml-16px un-text-32px un-fw400>MobVue</span>
    </h1>
    <h2 un-color-hex-969799 un-text-14px un-fw400>
      {{ t(props.text) }}
    </h2>
  </div>
</template>
