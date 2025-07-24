<script setup lang="ts">
import { useWatermark } from "@@/composables/useWatermark"
import NoticeBar from "./components/NoticeBar.vue"

const localRef = ref<HTMLElement | null>(null)

const { setWatermark, clearWatermark } = useWatermark(localRef)

const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div un-mb-20px>
    <NoticeBar text="Supports partial, global, and custom styles, with built-in protection and adaptability" />
    <div
      ref="localRef"
      class="local"
      un-mt-40px
      un-h-35vh
      un-b-2px
      un-b-dashed
      un-b-primary
    />
    <div un-mt-40px un-flex-x-center>
      <van-button
        type="primary"
        size="small"
        square
        @click="setWatermark('Local Watermark', { color: '#409eff', width: 200, height: 150 })"
      >
        Create Local Watermark
      </van-button>
      <van-button
        type="warning"
        size="small"
        square
        @click="setWatermark('Local Watermark without Protection', { color: '#e6a23c', defense: false, width: 200, height: 150 })"
      >
        Create Local Watermark Without Protection
      </van-button>
      <van-button
        type="danger"
        size="small"
        square
        @click="clearWatermark"
      >
        Clear Local Watermark
      </van-button>
    </div>
    <div un-mt-20px un-flex-x-center>
      <van-button
        type="primary"
        size="small"
        square
        @click="setGlobalWatermark('Global Watermark', { color: '#409eff', width: 200, height: 150 })"
      >
        Create Global Watermark
      </van-button>
      <van-button
        type="warning"
        size="small"
        square
        @click="setGlobalWatermark('Global Watermark without Protection', { color: '#e6a23c', defense: false, width: 200, height: 150 })"
      >
        Create Global Watermark Without Protection
      </van-button>
      <van-button
        type="danger"
        size="small"
        square
        @click="clearGlobalWatermark"
      >
        Clear Global Watermark
      </van-button>
    </div>
  </div>
</template>
