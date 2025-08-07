<script setup lang="ts">
import type { CommunityListDto, Industry } from "@/common/apis/community/type"
import { getCommunitiesApi, getIndustry } from "@@/apis/community"
import { onMounted, ref } from "vue"

import { router } from "@/router"
import Card from "./components/Card.vue"
import MobileNotSupport from "./components/popup/MobileNotSupport.vue"

const activeTag = ref<string[]>([])
const loading = ref(false)
const communities = ref<any[]>([])
const industries = ref<any[]>([])
const showMenu = ref(false)
const showDropdowm = ref(false)
const communityType = ref<number | null>(null)
const communityOrientations = ref([
  {
    value: 1,
    title: "Venture Sourcing Communities"
  },
  {
    value: 2,
    title: "Entrepreneurial Communities"
  },
  {
    value: 3,
    title: "Fundraise Communities"
  },
  {
    value: 4,
    title: "Talent Communities"
  }
])
const showWarningDesktop = ref(false)
function getTitleByCode(code: number | null): string {
  const found = communityOrientations.value.find(item => item.value === code)
  return found ? found.title : "Community Orientation"
}
const menuItems = ref([
  { title: "Create a Community", icon: "/images/menu/plus-icon.svg", showPopup: true },
  { title: "My Profile", icon: "/images/menu/profile-icon.svg", showPopup: false, path: "/me" },
  { title: "My Communities", icon: "/images/menu/community-icon.svg", showPopup: false, path: "/me" },
  { title: "Pricing", icon: "/images/menu/price-icon.svg", showPopup: true },
  { title: "up4d Community", icon: "/images/menu/up4d-community-icon.svg", showPopup: true },
  { title: "Tutorial Clip", icon: "/images/menu/clip-icon.svg", showPopup: true },
  { title: "Questions & Support", icon: "/images/menu/question-support-icon.svg", showPopup: true }
])

function setCommunityType(type: number) {
  communityType.value = type
  showDropdowm.value = false
}

async function fetchCommunities() {
  loading.value = true
  try {
    const form = {
      page: 1,
      pageSize: 12,
      industries: activeTag.value,
      professionalType: communityType.value
    }

    const res: any = await getCommunitiesApi(form)
    // Map data từ API
    communities.value = res.data.map((item: CommunityListDto) => ({
      community: item.community,
      setting: item.setting,
      memberCount: item.memberCount
    }))
  } finally {
    loading.value = false
  }
}

async function getAllIndustries() {
  loading.value = true
  try {
    const res: any = await getIndustry()
    // Map data từ API
    industries.value = [
      {
        key: "all",
        description: "All",
        value: "All",
        communityCount: 0
      },
      ...res.data.map((item: Industry) => ({
        key: item.key,
        description: item.description,
        value: item.value,
        communityCount: item.communityCount
      }))
    ]
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

function onMenuClick() {
  showMenu.value = true
}

function onDropdownClick() {
  showDropdowm.value = true
}

function activeTagName(key: string) {
  if (key === "all") {
    activeTag.value = []
  } else {
    const index = activeTag.value.indexOf(key)
    if (index === -1) {
      activeTag.value = [...activeTag.value, key]
    } else {
      activeTag.value = activeTag.value.filter(k => k !== key)
    }
  }
}
function updateShowWarningDesktopStatus(status: boolean, path: string = "") {
  if (!status) {
    router.push(path)
  }
  showWarningDesktop.value = status
}

onMounted(() => {
  fetchCommunities()
  getAllIndustries()
})
watch(activeTag, () => {
  fetchCommunities()
})

watch(communityType, () => {
  fetchCommunities()
})
</script>

<template>
  <div class="dashboard-page" un-pb-20px>
    <!-- Header -->
    <div class="header">
      <van-nav-bar :border="true">
        <template #left>
          <van-icon name="/images/menu/menu-icon.svg" size="24" color="#606060" @click="onMenuClick" />
          <img
            src="/images/logo/logo-header.svg"
            alt=""
            un-h-30px
            un-w-130px
            un-object-contain
            un-ml-0px
          >
        </template>
      </van-nav-bar>

      <div un-pt-20px class="title text-center">
        Welcome to <br>
        the B2B Community Suite
      </div>

      <!-- Dropdown -->
      <div class="dropdown" un-px-16px un-mt-20px @click="onDropdownClick()">
        <div class="dropdown-title">
          {{ getTitleByCode(communityType) }}
          <svg v-if="communityType === null" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path d="M6.12412 6.39812C6.42972 6.66931 6.88979 6.66931 7.19539 6.39812L12.5697 1.62897C13.125 1.13622 12.7765 0.218364 12.0341 0.218364H1.28543C0.543047 0.218364 0.194517 1.13622 0.749791 1.62897L6.12412 6.39812Z" fill="#2196F3" />
          </svg>
          <svg v-else @click.stop="communityType = null" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 22" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9921 10.0625L14.2919 6.76268C14.5523 6.50233 14.9744 6.50233 15.2348 6.76268C15.4951 7.02303 15.4951 7.44514 15.2348 7.70549L11.9349 11.0053L15.2348 14.3052C15.4951 14.5655 15.4951 14.9876 15.2348 15.248C14.9744 15.5083 14.5523 15.5083 14.2919 15.248L10.9921 11.9481L7.69228 15.248C7.43193 15.5083 7.00982 15.5083 6.74947 15.248C6.48912 14.9876 6.48912 14.5655 6.74947 14.3052L10.0493 11.0053L6.74947 7.70549C6.48912 7.44514 6.48912 7.02303 6.74947 6.76268C7.00982 6.50233 7.43193 6.50233 7.69228 6.76268L10.9921 10.0625Z" fill="#2196F3" />
            <path d="M11.0002 20.3334C16.1548 20.3334 20.3335 16.1547 20.3335 11C20.3335 5.84538 16.1548 1.66671 11.0002 1.66671C5.84551 1.66671 1.66683 5.84538 1.66683 11C1.66683 16.1547 5.84551 20.3334 11.0002 20.3334ZM11.0002 21.6667C5.10913 21.6667 0.333496 16.8911 0.333496 11C0.333496 5.109 5.10913 0.333374 11.0002 0.333374C16.8912 0.333374 21.6668 5.109 21.6668 11C21.6668 16.8911 16.8912 21.6667 11.0002 21.6667Z" fill="#2196F3" />
          </svg>
        </div>
      </div>

      <!-- Filter Tags -->
      <div
        un-pb-16px class="filter-tags"
        un-flex
        un-gap-8px
        un-px-16px
        un-mt-12px
        un-overflow-x-auto
        un-max-h-72px
      >
        <van-tag
          v-for="industry in industries"
          :key="industry.key"
          :type="industry.key === activeTag ? 'primary' : 'default'"
          round
          size="medium"
          @click="activeTagName(industry.key)"
          :style="{
            padding: '0px 12px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor:
              (activeTag.length === 0 && industry.key === 'all') || activeTag.includes(industry.key)
                ? '#2196f3'
                : 'white',
            color:
              (activeTag.length === 0 && industry.key === 'all') || activeTag.includes(industry.key)
                ? 'white'
                : '#2196f3',
            fontWeight: '500',
            height: '32px',
            whiteSpace: 'nowrap',
          }"
        >
          {{ industry.value }}
        </van-tag>
      </div>
    </div>
    <van-popup
      v-model:show="showDropdowm"
      position="bottom"
      round
      :style="{ width: '100%', height: '45%' }"
    >
      <div class="flex justify-center mt-4 my-2">
        <img un-h-48px src="/images/logo/logo-header.svg" alt="">
      </div>
      <div class="dropdown-description">
        Choose your Community Orientation
      </div>
      <div v-for="communityOrientation in communityOrientations" :key="communityOrientation.value" @click="setCommunityType(communityOrientation.value)" class="dropdown-item">
        {{ communityOrientation.title }}
      </div>
    </van-popup>
    <van-popup
      v-model:show="showMenu"
      position="left"

      :style="{ width: '80%', height: '100%' }"
    >
      <div @click="updateShowWarningDesktopStatus(item.showPopup, item.path)" v-for=" (item, index) in menuItems" :key="index" un-fw-700 class="menu-item">
        <img :src="item.icon" alt=""> {{ item.title }}
      </div>
    </van-popup>
    <van-popup v-model:show="showWarningDesktop" round>
      <MobileNotSupport :update-show-warning-desktop-status="updateShowWarningDesktopStatus" />
    </van-popup>
    <!-- Community List -->
    <div class="community-list">
      <van-skeleton v-if="loading" row="3" />
      <div v-else>
        <div v-if="communities?.length > 0">
          <Card v-for="community in communities" :community="community" :key="community.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-page {
  .van-nav-bar {
    background: transparent;
  }
  .van-dropdown-item__option {
    white-space: nowrap;
  }
  .van-dropdown-menu__title {
    font-weight: bold;
    color: #2196f3;
  }
  .van-dropdown-menu__title:after {
    border-color: transparent transparent #2196f3 #2196f3;
  }
  .van-dropdown-menu__bar {
    border-radius: 30px;
    height: 40px;
  }
}
</style>

<style scoped>
.header {
  background: linear-gradient(
    180deg,
    rgba(198, 237, 252, 0) 18.68%,
    rgba(201, 232, 251, 0.22) 28.59%,
    rgba(185, 225, 255, 0.44) 39.73%,
    rgba(156, 213, 255, 0.49) 54.22%
  );
}
.title {
  color: #2196f3;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
.discover-title {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #000;
}
.discover-subtitle {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 16px;
  font-weight: 600;
}
.filter-tags {
  max-height: 72px;
  overflow-y: auto;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px;
  color: #606060;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  line-height: 28px;
}
.menu-item:first-child {
  margin-top: 15px;
}
.dropdown-title {
  background: white;
  padding: 12px;
  border-radius: 40px;
  color: #2196f3;
  font-weight: bold;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow:
    rgba(60, 64, 67, 0.32) 0px 1px 2px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px,
    rgba(0, 0, 0, 0.1) 0px 1px 8px;
}
.dropdown-item {
  color: #000000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  padding: 4px 25px;
  border-bottom: 1px solid #d9d9d94d;
}
.dropdown-item:first-child {
  margin-top: 20px;
}
.dropdown-item:last-child {
  border-bottom: unset;
}
.dropdown-description {
  text-align: center;
  border-bottom: min(0.267vw, 2px) solid #d9d9d94d;
  padding-bottom: 15px;
  font-size: 13px;
  color: #606060;
}
</style>
