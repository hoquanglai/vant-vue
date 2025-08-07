<script lang="ts" setup>
</script>

<template>
  <div class="header">
    What is lorem ipsum ?
  </div>
  <div class="rule-content">
    <ul>
      <li>What is Lorem Ipsum?</li>
      <li class="ql-indent-1">
        Lorem Ipsum is simply dummy text of the printing
      </li>
    </ul>
    <ul>
      <li>What is Lorem Ipsum?</li>
      <li class="ql-indent-1">
        Lorem Ipsum is simply dummy text of the printing printing
      </li>
    </ul>
    <ul>
      <li>What is Lorem Ipsum?</li>
      <li class="ql-indent-1">
        Lorem Ipsum is simply dummy text of the printing
      </li>
    </ul>
  </div>
  <div class="flex justify-center gap-3 mb-3">
    <van-button round class="bg-blue text-white">
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
.rule-content {
  padding: 10px 20px 10px 36px;
  font-size: 14px;
  color: #606060;
  ul {
    list-style-image: url(/images/icon/check-blue.svg);
    li {
      font-weight: bold;
      &.ql-indent-1 {
        font-weight: normal;
        font-size: 13px;
        list-style: none;
        margin: 10px 0;
      }
    }
  }
}
</style>
