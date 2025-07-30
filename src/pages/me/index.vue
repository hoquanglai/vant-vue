<script setup lang="ts">
import type { CommunityListDto } from "@/common/apis/community/type"
import { useI18n } from "vue-i18n"
import { getMyCommunity } from "@/common/apis/community"
import { useUserStore } from "@/pinia/stores/user"

useI18n()
const user = useUserStore()
const communities = ref<any[]>([])
// const { isDark, changeDark } = useDark()
const loading = ref(false)
// function onLogout() {
//   const url = `${import.meta.env.VITE_CAM_BASE_URL}/auth/logout`
//   window.location.href = url
// }

async function fetchMyCommunities() {
  loading.value = true
  try {
    const res: any = await getMyCommunity()
    communities.value = res.data.map((item: CommunityListDto) => ({
      community: item.community,
      setting: item.setting
    }))
  } finally {
    loading.value = false
  }
}

onMounted(() => {})
fetchMyCommunities()
</script>

<template>
  <div v-if="user.fullName" class="profile-page" un-py-16px>
    <!-- Avatar + Name -->
    <div class="profile-header" un-flex un-flex-col un-items-center un-mt-15px>
      <van-image
        :src="user.avatar"
        round
        width="80"
        height="80"
        fit="cover"
      />
      <div un-mt-8px un-fw-600 un-text-20px>
        {{ user.fullName }}
      </div>
      <div class="email-wrapper">
        {{ user.email }}
      </div>
      <div un-mt-8px un-text-12px un-fw-bold>
        {{ user.professional }}
      </div>
    </div>

    <!-- Info cells -->
    <!-- <van-cell-group inset un-mt-16px>
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
    </van-cell-group> -->
    <div class="community-tab">
      <div class="tab-item">
        <div un-fw-700>
          0
        </div>
        <div un-text-12px un-mt-2px un-c-gray-700>
          communities
        </div>
      </div>
      <div class="tab-item">
        <div un-fw-700>
          0
        </div>
        <div un-text-12px un-mt-2px un-c-gray-700>
          joined
        </div>
      </div>
    </div>
    <div class="information-wrapper">
      <div class="image-wrapper">
        <img src="https://dev-c-platform-svc.up4d-group.com/static/0/user/avatar/7d4954eb-63fb-4b69-bdec-08649b82fb5e" alt="">
      </div>
      <div class="content">
        <p class="title">
          Lorem Ipsum is simply dummy text the printing  1
        </p>
        <div class="description">
          <span>up4d Pop-Up  Community</span>
          <span>Private</span>
        </div>
      </div>
      <div un-w-30px un-text-align-right>
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.86135 5.9412C5.83844 6.04012 5.78845 6.13403 5.71137 6.21112L1.21028 10.7122C0.990939 10.9315 0.635314 10.9315 0.415972 10.7122C0.196629 10.4929 0.196629 10.1372 0.415972 9.91789L4.52159 5.81227L0.416612 1.70729C0.19727 1.48795 0.19727 1.13233 0.416612 0.912983C0.635955 0.69364 0.991579 0.69364 1.21092 0.912983L5.71201 5.41407C5.85498 5.55704 5.90476 5.75791 5.86135 5.9412Z" fill="#D9D9D9" />
        </svg>
      </div>
    </div>
    <!-- Logout -->
    <!-- <van-button block @click="onLogout" un-b-0px un-rounded-0px un-text-14px>
      <div class="flex justify-center items-center gap-2 font-bold text-[#606060]">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
          <path d="M18.4686 4.24513C20.4678 5.54977 22.0022 7.45425 22.8516 9.68521C23.7011 11.9162 23.8219 14.3589 23.1967 16.6628C22.5715 18.9666 21.2324 21.0132 19.3718 22.5087C17.5111 24.0042 15.2244 24.8718 12.84 24.9869C10.4555 25.1019 8.09596 24.4586 6.0999 23.1492C4.10384 21.8399 2.57394 19.9317 1.72979 17.6988C0.885639 15.4658 0.770645 13.0228 1.40131 10.7204C2.03198 8.41802 3.37588 6.37463 5.24012 4.88354M12.016 1L12.016 11.1659" stroke="#606060" stroke-width="2" stroke-linecap="round" />
        </svg>
        {{ $t('profile.logout') }}
      </div>
    </van-button> -->
  </div>
</template>

<style>
.email-wrapper {
  font-size: 12px;
  margin-top: 8px;
  border-radius: 14px;
  padding: 4px 8px;
  border: 1px solid;
}
.community-tab {
  display: flex;
  padding: 2px 0;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 20px;
}
.tab-item {
  border-right: 1px solid #d9d9d9;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0 8px;
}
.information-wrapper {
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  .image-wrapper {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 1;
    .title {
      color: #606060;
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin: 0;
    }
    .description {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #2196f3;
      font-weight: bold;
      margin-top: 4px;
    }
  }
}
</style>
