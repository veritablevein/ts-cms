<template>
  <div class="main">
    <n-space vertical size="large">
      <n-layout has-sider class="main-content">
        <n-layout-sider
          class="aside"
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="210"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <main-menu :collapsed="collapsed"></main-menu>
        </n-layout-sider>
        <n-layout class="right-content">
          <n-layout-header class="header">
            header
            <n-button @click="handelExitClick">退出</n-button>
          </n-layout-header>
          <n-layout-content class="main"> main </n-layout-content>
          <n-layout-footer class="footer">footer</n-layout-footer>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'
import MainMenu from '@/components/main-menu/main-menu.vue'
import { ref } from 'vue'

function handelExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

const collapsed = ref(false)
</script>

<style lang="less" scope>
.main {
  height: 100%;
  .n-space {
    height: 100%;

    [role='none'] {
      height: 100%;
    }
    .main-content {
      height: 100%;

      .aside {
        background: var(--n-color);
      }

      .header {
        height: 24px;
        background-color: sandybrown;
      }

      .main {
        height: calc(100% - 24px - 24px);
        background-color: skyblue;
      }

      .footer {
        height: 24px;
        background-color: teal;
      }
    }
  }
}
</style>
