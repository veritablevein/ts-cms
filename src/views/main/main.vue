<template>
  <div class="main">
    <n-space vertical size="large">
      <n-layout has-sider class="main-content">
        <n-layout-sider class="aside"> aside </n-layout-sider>
        <n-layout class="right-content">
          <n-layout-header class="header">header</n-layout-header>
          <n-layout-content class="main"> main </n-layout-content>
          <n-layout-footer class="footer">footer</n-layout-footer>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script setup lang="ts"></script>

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
        background-color: salmon;
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
