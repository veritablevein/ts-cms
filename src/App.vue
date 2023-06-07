<template>
  <div class="app">
    <router-link to="/main">主页</router-link>
    <router-link to="/login">登录</router-link>
    counter:{{ counterStore.counter }} - {{ counterStore.doubleCount }}
    <n-button type="info" size="tiny" @click="changeCouter">
      修改counter
    </n-button>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from './stores/counter'

const counterStore = useCounterStore()
function changeCouter() {
  counterStore.changeCouterAction(999)
}
</script>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
