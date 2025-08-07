<script setup lang="ts">
import RulePopup from "./popup/RulePopup.vue"

defineOptions({
  name: "DetailPage"
})

const title = ref<string>("")
const description = ref<string>("")
const showRulePopup = ref(false)

function updateRulePopupStatus(status: boolean) {
  showRulePopup.value = status
}
</script>

<template>
  <div class="relative" un-mb-20px>
    <div class="logo-wrapper">
      <img class="logo-url" src="https://b2bcommunity.up4d-group.com/static/0/community/962a59ff-9ae8-4c82-a595-be15382a28b9/image/40c5a077-8efe-43f1-b58d-41232470dd2f" alt="logo">
    </div>
    <img class="banner-url" src="https://b2bcommunity.up4d-group.com/static/0/community/926224d8-a9b3-43a4-9816-33682ae00467/image/44cf3b1b-cb85-4e20-9694-4c8b364da2b3" alt="">
  </div>

  <div class="text-center text-grey uppercase font-bold">
    Welcome to the Wolfram Talent Community
  </div>
  <div class="text-center text-grey text-xs mt-3 px-4">
    Achieving more together – through a culture of appreciation, experience and progress. Wolfram Industrie offers space for growth to all.
  </div>
  <van-button @click="updateRulePopupStatus(true)" class="ml-1/2 -translate-x-1/2 mt-3 bg-primary text-white" round>
    Join Community
  </van-button>

  <van-popup v-model:show="showRulePopup" round>
    <RulePopup />
  </van-popup>

  <div class="title">
    {{ title }}
  </div>
  <div v-html="description" />
  <div class="details-page-summary-box">
    <p class="text-center">
      Company Values & Heritage
    </p>
    <br>
    <ul>
      <li>Made in Germany </li>
      <li class="ql-indent-1">
        Quality the world relies on.
      </li>
      <li class="ql-indent-1">
        Where tradition meets the future.
      </li>
    </ul>
    <p><br></p>
    <ul>
      <li>Family-Owned since 1911</li>
      <li class="ql-indent-1">
        Quality the world relies on.
      </li>
      <li class="ql-indent-1">
        Where tradition meets the future.
      </li>
    </ul>
    <p><br></p>
    <ul>
      <li>Sustainable Production</li>
      <li class="ql-indent-1">
        Quality the world relies on.
      </li>
      <li class="ql-indent-2">
        Where tradition meets the future.
      </li>
    </ul>
  </div>
  <div class="details-page-summary-box">
    <ul>
      <li>High-Performance Materials </li>
      <li class="ql-indent-1">
        Quality the world relies on.
      </li>
      <li class="ql-indent-1">
        Where tradition meets the future.
      </li>
    </ul>
    <p><br></p>
    <ul>
      <li>Technology & Innovation</li>
      <li class="ql-indent-1">
        Quality the world relies on.
      </li>
      <li class="ql-indent-1">
        Where tradition meets the future.
      </li>
    </ul>
    <p><br></p>
    <ul>
      <li>Global Wolfram Expertise</li>
      <li class="ql-indent-1">
        Quality the world relies on.
      </li>
      <li class="ql-indent-2">
        Where tradition meets the future.
      </li>
    </ul>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
.banner-url {
  width: 100%;
  height: auto;
}
.logo-wrapper {
  position: absolute;
  top: 50%;
  max-height: 220px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  height: 50%;
  left: 15%;
  .logo-url {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.title {
  color: #606060;
  text-align: center;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}
.description {
  color: #606060;
  text-align: center;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.details-page-summary-box {
  background: #2196f3;
  color: #fff;
  border-radius: 0.375rem;
  margin-bottom: 8px;
  padding: 10px 0;
  width: 250px;
  margin: 15px auto;
}
.details-page-summary-box {
  text-align: center;
}
.details-page-summary-box ul {
  list-style-image: url("/images/dashboard/check-white.svg");
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  text-align: left;
  font-weight: 700;
  font-size: 12px;
  margin: 0 25px;
}
</style>

<style>
.details-page-summary-box ul li.ql-indent-1 {
  list-style: none;
  font-weight: normal;
}
.details-page-summary-box ul li.ql-indent-2 {
  list-style: none;
  padding-left: 10px;
  font-weight: normal;
}
</style>
