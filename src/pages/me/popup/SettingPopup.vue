<script lang="ts" setup>
const isSubscribedToNewsletter = ref(false)
const notifySupport = ref(false)
const notifyDocShare = ref(false)
const notifyChat = ref(false)
const notifyPost = ref(false)
const notifyLinkShare = ref(false)
const notifyPollAndSurvey = ref(false)
const notifyNews = ref(false)
</script>

<template>
  <div class="header">
    What is lorem ipsum ?
  </div>
  <div class="description p-4 text-xs text-grey">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
  </div>
  <div class="px-2">
    <div class="action-notify-wrapper flex justify-between items-center">
      <span class="label-text" v-trans:notify_setting_newsletter>Newsletter</span>
      <van-switch v-model="isSubscribedToNewsletter" />
    </div>
    <div class="action-notify-wrapper mb-0">
      <div class="flex justify-between items-center mb-2">
        <span class="label-text" v-trans:notify_setting_support>Community support</span>
        <van-switch v-model="notifySupport" />
      </div>
      <div class="flex justify-between items-center my-2">
        <span class="label-text" v-trans:notify_setting_document>Doc-Share</span>
        <van-switch v-model="notifyDocShare" />
      </div>
      <div class="flex justify-between items-center my-2">
        <span class="label-text" v-trans:notify_setting_chat>Community Chat</span>
        <van-switch v-model="notifyChat" />
      </div>
      <div class="flex justify-between items-center my-2">
        <span class="label-text" v-trans:notify_setting_post>Community Posts</span>
        <van-switch v-model="notifyPost" />
      </div>
      <div class="flex justify-between items-center my-2">
        <span class="label-text" v-trans:notify_setting_link_share>Link Share</span>
        <van-switch v-model="notifyLinkShare" />
      </div>
      <div class="flex justify-between items-center my-2">
        <span class="label-text" v-trans:notify_setting_polls_and_surveys>Polls and Surveys</span>
        <van-switch v-model="notifyPollAndSurvey" />
      </div>
      <div class="flex justify-between items-center mt-2">
        <span class="label-text" v-trans:notify_setting_news>News</span>
        <van-switch v-model="notifyNews" />
      </div>
    </div>
  </div>
  <div class="flex justify-center gap-3 my-3">
    <van-button round class="bg-blue text-white font-bold">
      Lorem ipsum
    </van-button>
  </div>
</template>

<style scoped>
.header {
  background: #2196f3;
  text-align: center;
  color: white;
  padding: 14px 0;
  font-weight: bold;
  font-size: 14px;
}
.action-notify-wrapper {
  padding: 15px 20px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-bottom: 25px;

  .label-text {
    color: #2196f3;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
  }
}
</style>

<style>
.action-notify-wrapper {
  .van-switch {
    height: 24px;
    width: 48px;
    .van-switch__node {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
