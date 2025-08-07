<script setup lang="ts">
import type { CommunityListDto, JoinedCommunity } from "@/common/apis/community/type"
import { useI18n } from "vue-i18n"
import { getJoinedCommunity, getMyCommunity } from "@/common/apis/community"
import { useUserStore } from "@/pinia/stores/user"
import RulePopup from "../details/popup/RulePopup.vue"
import SettingPopup from "./popup/SettingPopup.vue"
import ViewJoinedCommunity from "./popup/ViewJoinedCommunity.vue"
import ViewMyCommunity from "./popup/ViewMyCommunity.vue"

useI18n()
const user = useUserStore()
const communities = ref<CommunityListDto[]>([])
const joinedCommunities = ref<JoinedCommunity[]>([])
const baseURL = import.meta.env.VITE_CAM_BASE_URL
const flag = ref(1)
// const { isDark, changeDark } = useDark()
const loading = ref(false)
const showViewMyCommunity = ref(false)
const showViewJoinedCommunity = ref(false)
const showRulePopup = ref(false)
const showSettingPopup = ref(false)
const packageTypes = [
  {
    key: "11",
    label: "up4d Pop-Up Community"
  },
  {
    key: "12",
    label: "up4d Loyalty Community"
  },
  {
    key: "13",
    label: "up4d Scale-Up Community"
  }
]
const LOGIN_PATH = `${import.meta.env.VITE_CAM_BASE_URL}/login/CPlatform?url-callback=dashboard`

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

async function fetchJoinedCommunities() {
  loading.value = true
  try {
    const res: any = await getJoinedCommunity()
    joinedCommunities.value = res.data
  } finally {
    loading.value = false
  }
}

function getLabelByKey(key: number | string) {
  const found = packageTypes.find(item => item.key === key)
  return found ? found.label : ""
}

function updateRulePopupStatus(status: boolean) {
  showRulePopup.value = status
}

function updateSettingPopupStatus(status: boolean) {
  showSettingPopup.value = status
}

onMounted(() => {
  if (!user || user?.email?.length === 0) {
    window.location.href = LOGIN_PATH
  }
})
fetchMyCommunities()
fetchJoinedCommunities()
</script>

<template>
  <div v-if="user.fullName" class="profile-page" un-py-16px>
    <!-- Avatar + Name -->
    <div class="profile-header" un-flex un-flex-col un-items-center un-mt-0>
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
    <div class="community-tab">
      <div @click="flag = 1" :class="flag === 1 ? 'active' : ''" class="tab-item">
        <div un-fw-700>
          {{ communities.length }}
        </div>
        <div class="des">
          communities
        </div>
      </div>
      <div @click="flag = 2" :class="flag === 1 ? '' : 'active'" class="tab-item">
        <div un-fw-700>
          {{ joinedCommunities.length }}
        </div>
        <div class="des">
          joined
        </div>
      </div>
    </div>
    <div un-mx-10px un-mt-10px un-overflow-auto class="list-community" v-if="flag === 1">
      <div v-for="community in communities" :key="community.community.id" class="information-wrapper">
        <div class="image-wrapper">
          <img v-if="community?.setting?.faviconLogoUrl" :src="`${baseURL}/static/0${community?.setting?.faviconLogoUrl}`" alt="">
          <img v-else src="https://dev-c-platform-svc.up4d-group.com/static/0/user/avatar/7d4954eb-63fb-4b69-bdec-08649b82fb5e" alt="">
        </div>
        <div class="content">
          <div v-if="community?.community?.name" v-html="community?.community?.name" class="title" />
          <div v-else class="title">
            Lorem Ipsum is simply dummy text
          </div>
          <div class="description">
            <span v-html="community?.setting?.shortDescription" />
            <span class="private-label" v-if="community?.community?.isPrivate">Private</span>
            <span class="private-label" v-else>Public</span>
          </div>
          <div class="package-type">
            <span>{{ getLabelByKey(community?.community?.packageType) }}</span>
          </div>
        </div>
        <div class="join-button-wrapper">
          <div @click="showViewMyCommunity = true" class="join-button">
            View
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.86135 5.9412C5.83844 6.04012 5.78845 6.13403 5.71137 6.21112L1.21028 10.7122C0.990939 10.9315 0.635314 10.9315 0.415972 10.7122C0.196629 10.4929 0.196629 10.1372 0.415972 9.91789L4.52159 5.81227L0.416612 1.70729C0.19727 1.48795 0.19727 1.13233 0.416612 0.912983C0.635955 0.69364 0.991579 0.69364 1.21092 0.912983L5.71201 5.41407C5.85498 5.55704 5.90476 5.75791 5.86135 5.9412Z" fill="#2196f3" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div un-mx-10px un-mt-10px un-overflow-auto class="list-community" v-if="flag === 2">
      <div v-for="community in joinedCommunities" :key="community.communityId" class="information-wrapper">
        <div class="image-wrapper">
          <img v-if="community.image" :src="`${baseURL}/static/0${community.image}`" alt="">
          <img v-else src="https://dev-c-platform-svc.up4d-group.com/static/0/user/avatar/7d4954eb-63fb-4b69-bdec-08649b82fb5e" alt="">
        </div>
        <div class="content">
          <div v-if="community.communityName" v-html="community.communityName" class="title" />
          <div v-else class="title">
            Lorem Ipsum is simply dummy text
          </div>
          <div class="description">
            <span v-html="community.shortDescription" />
            <span class="private-label" v-if="community.isPrivated">Private</span>
            <span class="private-label" v-else>Public</span>
          </div>
          <div class="package-type">
            <span>{{ getLabelByKey(community.type) }}</span>
          </div>
        </div>
        <div class="join-button-wrapper">
          <div @click="showViewJoinedCommunity = true" class="join-button">
            View
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.86135 5.9412C5.83844 6.04012 5.78845 6.13403 5.71137 6.21112L1.21028 10.7122C0.990939 10.9315 0.635314 10.9315 0.415972 10.7122C0.196629 10.4929 0.196629 10.1372 0.415972 9.91789L4.52159 5.81227L0.416612 1.70729C0.19727 1.48795 0.19727 1.13233 0.416612 0.912983C0.635955 0.69364 0.991579 0.69364 1.21092 0.912983L5.71201 5.41407C5.85498 5.55704 5.90476 5.75791 5.86135 5.9412Z" fill="#2196f3" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <van-popup
      v-model:show="showViewMyCommunity"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <ViewMyCommunity :update-rule-popup-status="updateRulePopupStatus" :update-setting-popup-status="updateSettingPopupStatus" />
    </van-popup>

    <van-popup
      v-model:show="showViewJoinedCommunity"
      round
      position="bottom"
      :style="{ height: '40%' }"
    >
      <ViewJoinedCommunity />
    </van-popup>

    <van-popup v-model:show="showRulePopup" round>
      <RulePopup />
    </van-popup>

    <van-popup v-model:show="showSettingPopup" round>
      <SettingPopup />
    </van-popup>

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

<style scoped>
.profile-page p {
  margin: 0;
}
.email-wrapper {
  font-size: 12px;
  margin-top: 8px;
  border-radius: 14px;
  padding: 4px 8px;
  border: 1px solid;
}
.community-tab {
  display: flex;
  padding: 0;
  border-top: min(0.267vw, 2px) solid #d9d9d9;
  border-bottom: min(0.267vw, 2px) solid #d9d9d9;
  margin: 10px 16px 0;
  border-radius: 40px;
  overflow: hidden;
}
.tab-item {
  border-right: 1px solid #d9d9d9;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0 8px;
  &.active {
    background: #2196f3;
    color: #fff;
    font-weight: bold;
  }
  .des {
    font-size: 12px;
    font-weight: 400;
  }
}
.information-wrapper {
  display: flex;
  padding: 10px 15px 50px;
  border: 1px solid #d9d9d9;
  align-items: center;
  position: relative;
  margin: 10px 0;
  border-radius: 10px;
  .image-wrapper {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    flex: 1;
    .title {
      color: black;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin: 0;
      font-weight: bold;
      padding-right: 60px;
    }
    .description {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #606060;
      margin: 6px 0;
    }
    .package-type {
      font-size: 14px;
      margin-top: 4px;
      color: #2196f3;
    }
  }
}
.join-button-wrapper {
  position: absolute;
  border: 1px solid #2196f3;
  padding: 8px 10px;
  color: #2196f3;
  right: 25px;
  bottom: 15px;
  font-weight: bold;
  border-radius: 8px;
  font-size: 14px;
}
.private-label {
  position: absolute;
  top: 10px;
  right: 12px;
  color: #000000b5;
  background: #00000017;
  padding: 2px 6px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: bold;
}
.list-community {
  height: calc(100vh - 320px);
  padding-bottom: 20px;
  p {
    margin: 0;
  }
}
</style>

<style>
.list-community {
  p {
    margin: 0;
  }
}
</style>
