<script setup lang="ts">
import { useDark } from "@@/composables/useDark"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/pinia/stores/user"

useI18n()
const user = useUserStore()
const { isDark, changeDark } = useDark()

function onLogout() {
  const url = `${import.meta.env.VITE_CAM_BASE_URL}/auth/logout`
  window.location.href = url
}
</script>

<template>
  <div v-if="user.fullName" class="profile-page" un-py-16px>
    <!-- Avatar + Name -->
    <div class="profile-header" un-flex un-flex-col un-items-center un-mt-24px>
      <van-image
        :src="user.avatar"
        round
        width="80"
        height="80"
        fit="cover"
      />
      <h2 un-mt-8px un-fw-600>
        {{ user.fullName }}
      </h2>
    </div>

    <!-- Info cells -->
    <van-cell-group inset un-mt-16px>
      <van-cell title="Full Name" :value="user.fullName" />
      <van-cell
        title="Gender"
        :value="user.gender === 'M' ? 'Male' : 'Female'"
      />
      <van-cell title="Professional" :value="user.professional" />
      <van-cell title="Country" :value="user.businessCountry" />
    </van-cell-group>
    <van-cell-group inset un-mt-16px>
      <van-cell :title="$t('profile.darkMode')">
        <template #right-icon>
          <van-switch :model-value="isDark" @click="changeDark" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- Logout -->
    <van-button block @click="onLogout" un-b-0px un-rounded-0px un-text-14px>
      <div class="flex justify-center items-center gap-2 font-bold text-[#606060]">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
          <path d="M18.4686 4.24513C20.4678 5.54977 22.0022 7.45425 22.8516 9.68521C23.7011 11.9162 23.8219 14.3589 23.1967 16.6628C22.5715 18.9666 21.2324 21.0132 19.3718 22.5087C17.5111 24.0042 15.2244 24.8718 12.84 24.9869C10.4555 25.1019 8.09596 24.4586 6.0999 23.1492C4.10384 21.8399 2.57394 19.9317 1.72979 17.6988C0.885639 15.4658 0.770645 13.0228 1.40131 10.7204C2.03198 8.41802 3.37588 6.37463 5.24012 4.88354M12.016 1L12.016 11.1659" stroke="#606060" stroke-width="2" stroke-linecap="round" />
        </svg>
        {{ $t('profile.logout') }}
      </div>
    </van-button>
  </div>
</template>
