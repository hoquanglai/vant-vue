<script setup lang="ts">
import Description from "@@/components/Description.vue"
import { demoRoutes, emptyDemoRoutes, systemRoutes } from "@/router"
import Cell from "./components/Cell.vue"
import Title from "./components/Title.vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
  <div un-px-20px un-py-26px un-select-none>
    <Description un-pl-16px />
    
    <div un-mt-40px>
      <Title :text="t('routes.demoGroup')" />
      <Cell
        v-for="route in [...demoRoutes, ...systemRoutes]"
        :key="route.path"
        :title="t(route.meta?.title || '')"
        :path="route.path"
        un-mt-12px
      />
    </div>

    <div un-my-20px>
      <Title :text="t('routes.moreDemo')" />
      <Cell
        v-for="route in emptyDemoRoutes"
        :key="route.path"
        :title="t(route.meta?.title || '')"
        :path="route.path"
        un-mt-12px
      />
    </div>

    <van-divider>{{ t('routes.prTip') }}</van-divider>
  </div>
</template>

