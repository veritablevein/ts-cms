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
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <main-menu :collapsed="collapsed"></main-menu>
        </n-layout-sider>
        <n-layout class="right-content">
          <n-layout-header class="header">
            <main-header
              :collapsed="collapsed"
              @fold-change="
                isFold => {
                  collapsed = isFold
                }
              "
            ></main-header>
          </n-layout-header>
          <n-layout-content class="main">
            <router-view></router-view>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

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

      .n-layout-scroll-container {
        display: flex;
        flex-direction: column;

        .header {
          display: flex;
          align-items: center;
          background: var(--n-color);
        }

        .main {
          flex: 1;
          background: var(--n-color);
        }
      }
    }
  }
}
</style>
