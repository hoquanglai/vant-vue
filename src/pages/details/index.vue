<script setup lang="ts">
defineOptions({
  name: "DetailPage"
})

const title = ref<string>("")
const description = ref<string>("")
</script>

<template>
  <div un-mb-20px>
    <img class="banner-url" src="https://b2bcommunity.up4d-group.com/static/0/community/926224d8-a9b3-43a4-9816-33682ae00467/image/44cf3b1b-cb85-4e20-9694-4c8b364da2b3" alt="">
  </div>

  <div>
    <p>Welcome to the Wolfram Talent Community</p>
  </div>

  <van-button round class="center">
    Join Community
  </van-button>

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
