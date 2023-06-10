<template>
  <div class="login-panel">
    <n-card class="title" title="后台管理系统" size="large">
      <n-tabs
        class="tabs"
        type="segment"
        default-value="signin"
        size="large"
        justify-content="space-evenly"
      >
        <n-tab-pane name="signin">
          <template #tab>
            <n-icon :component="AccountIcon" />
            账号登录
          </template>
          <n-form
            ref="formRef"
            :rules="accountRules"
            :model="account"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
            <n-form-item-row label="用户名" path="name">
              <n-input
                v-model:value="account.name"
                placeholder="请输入用户名"
              />
            </n-form-item-row>
            <n-form-item-row label="密码" path="password">
              <n-input
                type="password"
                v-model:value="account.password"
                placeholder="请输入密码"
              />
            </n-form-item-row>
          </n-form>
          <div class="controls">
            <n-checkbox
              v-model:checked="isRemPwd"
              size="large"
              label="记住密码"
            />
            <n-a>忘记密码</n-a>
          </div>
          <n-button
            class="login-btn"
            type="primary"
            size="large"
            @click="handleValidateClick"
          >
            立即登录
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="">
          <template #tab>
            <n-icon :component="PhoneIcon" />
            手机登录
          </template>
          <n-form>
            <n-form-item-row label="用户名">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="验证码">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> 注册 </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import AccountIcon from '@/components/icons/account-icon.vue'
import PhoneIcon from '@/components/icons/phone-icon.vue'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
const CACHE_IS_REM_PWD = 'isRemPwd'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const isRemPwd = ref<boolean>(localCache.getCache(CACHE_IS_REM_PWD) ?? false)
watch(isRemPwd, newValue => {
  localCache.setCache(CACHE_IS_REM_PWD, newValue)
})

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const loginStore = useLoginStore()
function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(error => {
    if (!error) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(res => {
        if (isRemPwd.value) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
      message.success('登录成功')
    } else {
      message.error('登录失败')
    }
  })
}
</script>

<style scoped lang="less">
.login-panel {
  width: 430px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin-left: 5px;
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --n-height: 50px !important;
  }
}
</style>
