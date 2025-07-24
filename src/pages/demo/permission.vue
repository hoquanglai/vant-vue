<script setup lang="ts">
import { checkPermission } from "@@/utils/permission"
import { useUserStore } from "@/pinia/stores/user"
import NoticeBar from "./components/NoticeBar.vue"

const userStore = useUserStore()

const checked = ref<string>(userStore.roles[0])

function onChange(name: string) {
  userStore.changeRoles(name)
}
</script>

<template>
  <div un-mb-20px>
    <NoticeBar text="Button-level control based on permission directives and functions" />

    <van-radio-group v-model="checked" @change="onChange">
      <van-cell-group title="Switch User" inset>
        <van-cell title="Admin User" @click="checked = 'admin'">
          <template #right-icon>
            <van-radio name="admin" />
          </template>
        </van-cell>
        <van-cell title="Editor User" @click="checked = 'editor'">
          <template #right-icon>
            <van-radio name="editor" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-cell-group title="Permission Directives" inset>
      <van-cell v-permission="['admin']" title="Visible to Admin" value="Role admin" />
      <van-cell v-permission="['admin', 'editor']" title="Visible to Admin or Editor" value="Role admin or editor" />
    </van-cell-group>

    <van-cell-group title="Permission Functions" inset>
      <van-cell v-if="checkPermission(['admin'])" title="Visible to Admin" value="Role admin" />
      <van-cell v-if="checkPermission(['admin', 'editor'])" title="Visible to Admin or Editor" value="Role admin or editor" />
    </van-cell-group>
  </div>
</template>
