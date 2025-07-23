<template>
  <div class="profile-page" un-py-16px>
    <!-- Avatar + Name -->
    <div class="profile-header" un-flex un-flex-col un-items-center un-mt-24px>
      <van-image
        :src="userStore.avatar"
        round
        width="80"
        height="80"
        fit="cover"
      />
      <h2 un-mt-8px un-fw-600>{{ userStore.fullName }}</h2>
    </div>

    <!-- Info cells -->
    <van-cell-group inset un-mt-16px>
      <van-cell title="Full Name" :value="userStore.fullName" />
      <van-cell
        title="Gender"
        :value="userStore.gender === 'M' ? 'Male' : 'Female'"
      />
      <van-cell title="Professional" :value="userStore.professional" />
      <van-cell title="Country" :value="userStore.businessCountry" />
    </van-cell-group>
    <van-cell-group inset un-mt-16px>
      <van-cell :title="$t('profile.darkMode')">
        <template #right-icon>
          <van-switch :model-value="isDark" @click="changeDark" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- Logout -->
    <!-- <van-button block un-mt-20px @click="onLogout">
      {{ $t('profile.logout') }}
    </van-button> -->
  </div>
</template>

<script setup lang="ts">
import { useDark } from "@@/composables/useDark"
import { useUserStore } from "@/pinia/stores/user"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const { isDark, changeDark } = useDark()

function onLogout() {
  userStore.resetToken()
  router.push("/login")
}
</script>
