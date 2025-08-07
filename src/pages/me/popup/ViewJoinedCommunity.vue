<script lang="ts" setup>

</script>

<template>
  <div un-px-20px>
    <div class="header-content">
      <img class="ml-1/2 -translate-x-1/2 my-3" src="/images/logo/logo-circle.svg" alt="logo">
      <div class="text-blue font-bold mb-2">
        Lorem Ipsum is simply dummy text of the printing 1
      </div>
      <div class="flex items-center text-grey text-xs my-2">
        <div class="font-bold mr-2">
          Date joined:
        </div>
        <div>14/02/2025</div>
      </div>
      <div class="flex items-center text-grey text-xs my-2">
        <div class="font-bold mr-2">
          Notification
        </div>
        <van-button round class="bg-blue text-white">
          Settings
        </van-button>
      </div>
    </div>
    <div class="action">
      <div class="flex items-center gap-3 text-grey text-xs my-2">
        <img src="/images/icon/setting-o.svg" alt="">
        Setting
      </div>
      <div class="flex items-center gap-3 text-grey text-xs my-2">
        <img src="/images/icon/leave-icon.svg" alt="">
        Access community
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-content {
  border-bottom: 1px solid #ececec;
  padding: 8px 0px;
  margin-bottom: 12px;
}
.status {
  padding: 8px 16px;
  background: #42a245;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  text-transform: uppercase;
}
</style>
