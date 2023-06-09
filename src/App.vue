<template>
  <div class="app">
    <n-config-provider :theme="theme">
      <n-global-style />
      <n-switch
        v-model:value="isDarkMode"
        @update:value="handleModeChange"
        size="large"
      >
        <template #checked-icon>
          <n-icon :component="DarkModeIcon" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="LightModeIcon" />
        </template>
      </n-switch>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'
import type { GlobalTheme } from 'naive-ui'
import DarkModeIcon from '@/components/icons/dark-mode-icon.vue'
import LightModeIcon from '@/components/icons/light-mode-icon.vue'

const theme = ref<GlobalTheme | null>(darkTheme)
const isDarkMode = ref(true)
function handleModeChange(value: boolean) {
  if (value) {
    theme.value = darkTheme
  } else {
    theme.value = null
  }
}
</script>

<style scoped lang="less">
.app .n-config-provider {
  width: 100vw;
  height: 100vh;
}

.n-switch {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
