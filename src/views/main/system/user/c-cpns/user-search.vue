<template>
  <div class="search">
    <n-card>
      <n-form
        ref="formRef"
        :model="searchForm"
        size="large"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="用户名" path="name">
            <n-input
              v-model:value="searchForm.name"
              placeholder="请输入用户名"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="真实姓名" path="realname">
            <n-input
              v-model:value="searchForm.realname"
              placeholder="请输入真实姓名"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="手机号码" path="cellphone">
            <n-input
              v-model:value="searchForm.cellphone"
              placeholder="请输入手机号码"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="状态" path="enable">
            <n-select
              v-model:value="searchForm.enable"
              placeholder="请选择状态"
              :options="stateOptions"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="创建时间" path="createAt">
            <n-date-picker
              v-model:value="searchForm.createAt"
              type="daterange"
              clearable
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <n-space justify="end" class="btn">
        <n-button @click="handleResetClick">
          <n-icon>
            <refresh-icon />
          </n-icon>
          重置
        </n-button>
        <n-button type="primary" @click="handleQueryClick">
          <n-icon>
            <search-icon />
          </n-icon>
          查询
        </n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const stateOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: null,
  createAt: null
})

const emit = defineEmits(['queryClick', 'resetClick'])

function handleResetClick() {
  searchForm.name = ''
  searchForm.realname = ''
  searchForm.cellphone = ''
  searchForm.enable = null
  searchForm.createAt = null

  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.search {
  padding: 20px;

  :deep(.n-form-item) {
    padding: 8px 20px;
  }

  .btn {
    margin-right: 20px;
  }
}
</style>
