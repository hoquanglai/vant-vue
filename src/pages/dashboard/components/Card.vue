<script setup lang="ts">
import type { CommunityListDto } from "@@/apis/community/type.ts"

const { community } = defineProps<{ community: CommunityListDto }>()
</script>

<template>
  <div

    class="community-card"
    un-mb-20px
    un-bg-white
    un-shadow
    un-border-none
    un-overflow-hidden
  >
    <!-- Cover Image -->
    <img
      :src="community?.setting?.featureUrl ?? undefined"
      alt=""
      un-w-full
      un-h-220px
      un-object-cover
    >

    <!-- Info -->

    <div class="info-wrapper" un-px-12px>
      <div class="flex items-center" un-gap-8px un-py-8px>
        <img
          src="https://dev-b2bcommunity.up4d-group.com/static/0/community/ae98cc2d-1274-4431-800a-7d3bfe035dfc/image/7e79fb50-c6e8-493c-9576-a49651f9d28c"
          alt="favicon"
          un-w-30px
          un-h-30px
          un-rounded-full
        >
        <div un-text-lg un-fw-600>
          {{ community?.community?.name }}
        </div>
      </div>
      <div un-text-sm un-color-gray-500 un-pt-4px un-pb-8px>
        {{ community?.setting?.description }}
      </div>
      <div class="member-number-wrapper">
        <div class="member">
          {{ community?.memberCount }} Member
        </div>
        <div class="flag" un-flex un-gap-8px>
          <span v-if="community?.setting?.language?.includes('en')">
            <img
              src="/images/dashboard/flag-usa.svg"
              alt="flag"
            >
          </span>
          <span v-if="community?.setting?.language?.includes('de')">
            <img
              src="/images/dashboard/flag-ger.svg"
              alt="flag"
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.community-card {
  transition: 0.2s;
  border: none !important;
}
.community-card:hover {
  transform: translateY(-2px);
}
.info-wrapper {
  background: linear-gradient(180deg, #f8fcff 50.11%, #f6fbff 61.5%, #d7eeff 100%);
}
.member-number-wrapper {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
}
.member {
  color: #606060;
  text-align: justify;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
