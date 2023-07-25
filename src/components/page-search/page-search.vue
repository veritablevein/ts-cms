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
          <template v-for="item in searchConfig.formItems" :key="item.prop">
            <n-form-item-gi :span="8" :label="item.label" :path="item.prop">
              <!-- <component :is="'n-' + item.type"></component> -->
              <template v-if="item.type === 'input'">
                <n-input
                  v-model:value="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <n-select
                  v-model:value="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  :options="item.options"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <n-date-picker
                  v-model:value="searchForm[item.prop]"
                  type="daterange"
                  clearable
                />
              </template>
            </n-form-item-gi>
          </template>
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
import type { SelectGroupOption, SelectOption } from 'naive-ui'
import { reactive } from 'vue'
import type { ISearchProps } from './types'

const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<ISearchProps>()

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? null
}

const searchForm = reactive(initialForm)

function handleResetClick() {
  for (const key in searchForm) {
    searchForm[key] = null
  }
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
