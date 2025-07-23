<template>
  <div class="dashboard-page" un-pb-20px>
    <!-- Header -->
    <van-nav-bar fixed>
      <template #left>
        <van-icon name="bars" size="24" color="gray" @click="onMenuClick" />
        <img
            src="https://dev-b2bcommunity.up4d-group.com/assets/images/dashboard/logo-header.svg"
            alt=""
            un-h-30px
            un-w-130px
            un-object-contain
            un-ml-0px
          />
      </template>
    </van-nav-bar>

    <div class="discover-title">Discover communities</div>
    <div class="discover-subtitle">
      or <a href="#" style="color: #1989fa; text-decoration: none;">create your own</a>
    </div>


    <!-- Search -->
    <div class="search-bar" un-px-16px un-mt-20px>
      <van-search
        v-model="search"
        placeholder="Search for anything"
        shape="round"
        background="#fff"
      />
    </div>

    <!-- Filter Tags -->
    <div class="filter-tags" 
      un-flex
      un-gap-8px
      un-px-16px
      un-mt-12px
      un-flex-wrap
      un-overflow-y-auto
      un-overflow-x-hidden
      un-max-h-72px
      >
    <van-tag
      v-for="tag in tags"
      :key="tag.label"
      :type="tag.label === activeTag ? 'primary' : 'default'"
      round
      size="medium"
      @click="activeTag = tag.label"
      :style="{
      padding: '0px 12px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      border: tag.label === activeTag ? '1px solid rgb(79 81 85)' : '1px solid gray',
      backgroundColor: tag.label === activeTag ? 'rgb(79 81 85)' : 'white',
      color: tag.label === activeTag ? 'white' : 'gray',
      fontWeight: '500',
      height: '32px',
    }"
    >
      <span style="margin-right: 4px;">{{ tag.icon }}</span>
      {{ tag.label }}
    </van-tag>
  </div>
    <!-- Community List -->
    <div class="community-list" un-mt-16px>
      <van-skeleton v-if="loading" row="3" />
      <div v-else>
        <div
          v-for="community in filteredCommunities"
          :key="community.id"
          class="community-card"
          un-mb-20px
          un-bg-white
          un-shadow
          un-border-none
          un-overflow-hidden
        >
          <!-- Cover Image -->
          <img
            :src="community.coverImage"
            alt=""
            un-w-full
            un-h-220px
            un-object-cover
          />

          <!-- Info -->
          <div un-p-12px>
            <img
      v-if="community.favicon"
      :src="community.favicon"
      alt="favicon"
      un-w-16px
      un-h-16px
      un-rounded-full
    />
            <h3 un-text-lg un-fw-600>{{ community.name }}</h3>
            <p un-text-sm un-color-gray-500 un-mt-4px>
              {{ community.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { getCommunitiesApi } from "@@/apis/community"
import { CommunityListDto } from "@/common/apis/community/type"

const search = ref("")
const tags = [
  { label: "All", icon: "" },
  { label: "Hobbies", icon: "🎨" },
  { label: "Music", icon: "🎸" },
  { label: "Money", icon: "💰" }
]

const activeTag = ref("All")
const loading = ref(false)
const communities = ref<any[]>([])

// Lọc communities theo search & tag
const filteredCommunities = computed(() => {
  let list = communities.value

  if (activeTag.value !== "All") {
    list = list.filter(c => c.category === activeTag.value)
  }
  if (search.value) {
    list = list.filter(c =>
      c.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  return list
})

const fetchCommunities = async () => {
  loading.value = true
  try {
    const form = {
      page: 1,
      pageSize: 12,
      industries: [],
      professionalType: null
    };
  
    const res: any = await getCommunitiesApi(form);
    // Map data từ API
    communities.value = res.data.map((item: CommunityListDto) => ({
      id: item.community.id,
      name: item.community.name,
      coverImage: item.setting.featureUrl,
      description: item.setting.shortDescription,
      membersCount: item.memberCount,
      category: item.setting.professionalType || "Hobbies",
      favicon: item.setting.faviconLogoUrl
    }))
  } finally {
    loading.value = false
  }
}

const onMenuClick = () => {
  console.log("Hamburger menu clicked")
  // mở drawer/sidebar tùy bạn
}


onMounted(() => {
  fetchCommunities()
})
</script>

<style scoped>
.community-card {
  transition: 0.2s;
  border: none !important;
}
.community-card:hover {
  transform: translateY(-2px);
}
.discover-title {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 12px;
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


</style>
