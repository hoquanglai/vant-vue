<script lang="ts" setup>
interface Props {
  updateRulePopupStatus: (status: boolean) => void
  updateSettingPopupStatus: (status: boolean) => void
}

const props = defineProps<Props>()
</script>

<template>
  <div un-px-20px>
    <div class="header-content">
      <img class="ml-1/2 -translate-x-1/2 my-3" src="/images/logo/logo-circle.svg" alt="logo">
      <div class="text-blue font-bold mb-2">
        Lorem Ipsum is simply dummy text of the printing 1
      </div>
      <div class="flex items-center text-grey text-xs my-4">
        <div class="font-bold mr-2">
          Style plan:
        </div>
        <div>up4d Pop-Up  Community</div>
      </div>
      <div class="flex items-center text-grey text-xs my-4">
        <div class="font-bold mr-2">
          Date Create:
        </div>
        <div>14/08/2025</div>
      </div>
      <div class="flex items-center text-grey text-xs my-4">
        <div class="font-bold mr-2">
          Expiration Date:
        </div>
        <div>22/08/2025</div>
      </div>
      <div class="flex items-center text-grey text-xs my-4">
        <div class="font-bold mr-2">
          Subscription
        </div>
        <div>Payment Annually</div>
      </div>
      <div class="flex items-center text-grey text-xs my-2">
        <div class="font-bold mr-2">
          Status:
        </div>
        <div class="status">
          public
        </div>
      </div>
    </div>
    <div class="action">
      <div @click="props.updateSettingPopupStatus(true)" class="flex items-center gap-3 text-grey text-xs my-2">
        <img src="/images/icon/setting-o.svg" alt="">
        Setting
      </div>
      <div @click="props.updateRulePopupStatus(true)" class="flex items-center gap-3 text-grey text-xs my-2">
        <img src="/images/icon/go-to-web.svg" alt="">
        Access community
      </div>
      <div class="flex items-center gap-3 text-grey text-xs my-2">
        <img src="/images/icon/close.svg" alt="">
        Detele
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
