<script setup lang="ts">
import type { CommunityListDto, Industry } from "@/common/apis/community/type"
import { getCommunitiesApi, getIndustry } from "@@/apis/community"
import { computed, onMounted, ref } from "vue"

import Card from "./components/Card.vue"

const search = ref("")

const activeTag = ref<string[]>([])
const loading = ref(false)
const communities = ref<any[]>([])
const industries = ref<any[]>([])
const showMenu = ref(false)
const communityType = ref(0)
const communityTypeOption = ref([
  { text: "Venture Sourcing Communities", value: 0 },
  { text: "Entrepreneurial Communities", value: 1 },
  { text: "Fundraise Communities", value: 2 },
  { text: "Talent Communities", value: 3 }
])

const filteredCommunities = computed(() => {
  let list = communities.value

  // Nếu activeTag không rỗng và không chứa 'All' thì mới lọc theo tag
  if (activeTag.value.length > 0 && !activeTag.value.includes("All")) {
    list = list.filter(c => activeTag.value.includes(c.category))
  }

  // Lọc theo từ khóa tìm kiếm
  if (search.value) {
    list = list.filter(c =>
      c.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  return list
})

async function fetchCommunities() {
  loading.value = true
  try {
    const form = {
      page: 1,
      pageSize: 12,
      industries: [],
      professionalType: null
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
        key: "All",
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
function activeTagName(key: string) {
  const index = activeTag.value.indexOf(key)
  if (index === -1) {
    activeTag.value.push(key) // chưa có => thêm
  } else {
    activeTag.value.splice(index, 1) // đã có => xóa
  }
}

onMounted(() => {
  fetchCommunities()
  getAllIndustries()
})
</script>

<template>
  <div class="dashboard-page" un-pb-20px>
    <!-- Header -->
    <div class="header">
      <van-nav-bar :border="false">
        <template #left>
          <van-icon name="/images/menu/menu-icon.svg" size="24" color="#606060" @click="onMenuClick" />
          <img
            src="https://dev-b2bcommunity.up4d-group.com/assets/images/dashboard/logo-header.svg"
            alt=""
            un-h-30px
            un-w-130px
            un-object-contain
            un-ml-0px
          >
        </template>
      </van-nav-bar>

      <div class="title text-center">
        Welcome to <br>
        the B2B Community Suite
      </div>

      <!-- Dropdown -->
      <div class="dropdown" un-px-16px un-mt-20px>
        <van-dropdown-menu>
          <van-dropdown-item v-model="communityType" :options="communityTypeOption" />
        </van-dropdown-menu>
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
            backgroundColor: activeTag.includes(industry.key) ? '#2196f3' : 'white',
            color: activeTag.includes(industry.key) ? 'white' : '#2196f3',
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
      v-model:show="showMenu"
      position="left"
      :style="{ width: '80%', height: '100%' }"
    >
      <div class="menu-item">
        <img src="/images/menu/plus-icon.svg" alt="">Create a Community
      </div>
      <div class="menu-item">
        <img src="/images/menu/profile-icon.svg" alt="">My Profile
      </div>
      <div class="menu-item">
        <img src="/images/menu/community-icon.svg" alt="">My Communities
      </div>
      <div class="menu-item">
        <img src="/images/menu/price-icon.svg" alt="">Pricing
      </div>
      <div class="menu-item">
        <img src="/images/menu/up4d-community-icon.svg" alt="">up4d Community
      </div>
      <div class="menu-item">
        <img src="/images/menu/clip-icon.svg" alt="">Tutorial Clip
      </div>
      <div class="menu-item">
        <img src="/images/menu/question-support-icon.svg" alt="">Questions & Support
      </div>
    </van-popup>
    <!-- Community List -->
    <div class="community-list">
      <van-skeleton v-if="loading" row="3" />
      <div v-else>
        <div v-if="filteredCommunities?.length > 0">
          <Card v-for="community in filteredCommunities" :community="community" :key="community.id" />
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
.title {
  color: #2196f3;
  text-align: center;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>

<style scoped>
.header {
  background: linear-gradient(310deg, #c6edfc 18.68%, #c9e8fb 28.59%, #b9e1ff 39.73%, #9cd5ff 54.22%);
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
  font-weight: 700;
  line-height: 28px;
}
.menu-item:first-child {
  margin-top: 15px;
}
</style>
