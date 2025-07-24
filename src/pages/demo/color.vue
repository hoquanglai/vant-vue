<script setup lang="ts">
import type { Mode } from "@@/composables/useGrayscaleAndColorblind"
import { useGrayscaleAndColorblind } from "@@/composables/useGrayscaleAndColorblind"
import NoticeBar from "./components/NoticeBar.vue"

const { mode, setMode } = useGrayscaleAndColorblind()

const checked = ref<Mode>(mode.value)

function onChange(name: Mode) {
  setMode(name)
}
</script>

<template>
  <div un-mb-20px>
    <NoticeBar text="Designed for mourning scenarios and people with color vision deficiency" />

    <van-radio-group v-model="checked" @change="onChange">
      <van-cell-group title="Switch Mode" inset>
        <van-cell title="None" @click="checked = ''">
          <template #right-icon>
            <van-radio name="" />
          </template>
        </van-cell>
        <van-cell title="Grayscale Mode" @click="checked = 'grayscale'">
          <template #right-icon>
            <van-radio name="grayscale" />
          </template>
        </van-cell>
        <van-cell title="Colorblind Mode" @click="checked = 'colorblind'">
          <template #right-icon>
            <van-radio name="colorblind" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
