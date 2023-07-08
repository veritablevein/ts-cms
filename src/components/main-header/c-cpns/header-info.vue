<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <n-icon size="24">
          <mail-icon />
        </n-icon>
      </span>
      <span>
        <n-badge :value="1" :max="99">
          <n-icon size="24" color="var(--n-text-color)">
            <chat-line-round-icon />
          </n-icon>
        </n-badge>
      </span>
      <span>
        <n-icon size="24">
          <search-icon />
        </n-icon>
      </span>
    </div>
    <n-dropdown trigger="click" :options="options">
      <span class="user-info">
        <n-avatar
          round
          size="medium"
          src="https://avatars.githubusercontent.com/u/36351249?v=4"
        />
        <span>veritablevein</span>
      </span>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import MailIcon from '@/components/icons/mail-icon.vue'
import ChatLineRoundIcon from '@/components/icons/chat-line-round-icon.vue'
import SearchIcon from '@/components/icons/search-icon.vue'
import InfoIcon from '@/components/icons/info-icon.vue'
import LockOpenIcon from '@/components/icons/lock-open-icon.vue'
import ExitIcon from '@/components/icons/exit-icon.vue'
import { h, type Component } from 'vue'
import { NIcon } from 'naive-ui'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

function renderIcon(icon: Component) {
  if (!icon) return undefined
  return () => h(NIcon, null, { default: () => h(icon) })
}

const options = [
  {
    label: '退出系统',
    key: 'logout',
    icon: renderIcon(ExitIcon),
    props: {
      onClick: () => {
        localCache.removeCache(LOGIN_TOKEN)
        router.push('/login')
      }
    }
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '个人信息',
    key: 'profile',
    icon: renderIcon(InfoIcon)
  },
  {
    label: '修改密码',
    key: 'editProfile',
    icon: renderIcon(LockOpenIcon)
  }
]
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  margin-right: 10px;
  .operation {
    display: flex;
    align-items: center;
    margin-right: 10px;

    span {
      display: flex;
      align-items: center;
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
}
</style>
