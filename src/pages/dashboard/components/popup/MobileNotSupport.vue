<script setup lang="ts">
interface Props {
  updateShowWarningDesktopStatus: (status: boolean) => void
}

const props = defineProps<Props>()

function moveToCplatform() {
  window.location.href = import.meta.env.VITE_CPLATFORM_BASE_URL
}
</script>

<template>
  <div class="header">
    What is lorem ipsum ?
  </div>
  <div class="content">
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  </div>
  <div class="flex justify-center gap-3 mb-3">
    <van-button @click="props.updateShowWarningDesktopStatus(false)" round class="bg-blue text-white">
      Close
    </van-button>
    <van-button @click="moveToCplatform()" round class="bg-blue text-white">
      Continue
    </van-button>
  </div>
</template>

<style scoped>
.header {
  background: #2196f3;
  text-align: center;
  color: white;
  padding: 11px 0;
  font-weight: bold;
  font-size: 14px;
}
.content {
  padding: 10px 20px 10px 36px;
  font-size: 14px;
  color: #606060;
}
</style>
