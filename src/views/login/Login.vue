<template>
  <div class="login">
    <h1>login</h1>
  </div>
</template>

<script setup lang="ts">
import myRequest from '@/services'

myRequest
  .get({
    url: 'home/multidata'
  })
  .then(res => {
    console.log(res)
  })
</script>

<style scoped lang="less">
.login {
  color: red;
}
</style>
