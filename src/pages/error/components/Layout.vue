<template>
  <div un-h-full un-flex-center un-flex-col>
    <div un-w-250px un-mb-50px>
      <slot />
    </div>
    <van-button type="primary" to="/" replace>
      Back to Home
    </van-button>
  </div>
</template>
