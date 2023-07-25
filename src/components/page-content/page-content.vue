<template>
  <div class="content">
    <n-card>
      <template #header>
        <n-space justify="space-between">
          <h3>{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
          <n-button type="primary" @click="handleNewUserClick">
            {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
          </n-button>
        </n-space>
      </template>
      <n-data-table
        :single-line="false"
        :columns="columns"
        :data="pageList"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      />
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40, 50]"
        :display-order="['size-picker', 'pages', 'quick-jumper']"
        :item-Count="pageTotalCount"
        show-size-picker
        show-quick-jumper
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <template #prefix="{ itemCount }"> 共 {{ itemCount }} 条 </template>
      </n-pagination>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton, NIcon, NTag, useDialog } from 'naive-ui'
import { h, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import EditIcon from '@/components/icons/edit-icon.vue'
import DeleteIcon from '@/components/icons/delete-icon.vue'
import type { IContentProps } from './types'

const props = defineProps<IContentProps>()

const dialog = useDialog()
const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()

const page = ref(1)
const pageSize = ref(10)

fetchPageListData()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

const rowKey = (row: any) => row.id
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
}

const createColumns = (): DataTableColumns<any> => {
  if (!props.contentConfig.columns) {
    return []
  }
  return props.contentConfig.columns.map(item => {
    if (item.type === 'no.') {
      return {
        title: item.title,
        key: '',
        render: (_: any, index: any) => {
          return `${index + 1}`
        },
        align: 'center'
      }
    } else if (item.type === 'selection') {
      return {
        type: 'selection',
        disabled(row: any) {
          return row.id === 1
        },
        align: 'center'
      }
    } else if (item.type === 'time') {
      return {
        title: item.title,
        key: item.key,
        align: item.align,
        render(row: any) {
          return formatUTC(row[item.key])
        }
      }
    } else if (item.type === 'handler') {
      return {
        title: item.title,
        key: '',
        render(row: any) {
          return [
            h(
              NButton,
              {
                size: 'small',
                text: true,
                type: 'primary',
                style: {
                  marginRight: '6px'
                },
                renderIcon: () =>
                  h(NIcon, null, { default: () => h(EditIcon) }),
                onClick: () => emit('editClick', row)
              },
              { default: () => '编辑' }
            ),

            h(
              NButton,
              {
                size: 'small',
                text: true,
                type: 'error',
                style: {
                  marginLeft: '6px'
                },
                renderIcon: () =>
                  h(NIcon, null, { default: () => h(DeleteIcon) }),
                onClick: () => {
                  dialog.warning({
                    title: '警告',
                    content: item.dialogContent ?? '确定删除数据吗？',
                    positiveText: '确定',
                    negativeText: '算了',
                    onPositiveClick: () => {
                      systemStore.deletePageByIdAction(
                        props.contentConfig.pageName,
                        row.id!
                      )
                    }
                  })
                }
              },
              { default: () => '删除' }
            )
          ]
        },
        align: 'center'
      }
    } else {
      return {
        title: item.title,
        key: item.key,
        align: item.align
      }
    }
  })
}

const columns = createColumns()

function handlePageChange() {
  fetchPageListData()
}

function handlePageSizeChange() {
  fetchPageListData()
}

function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (page.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formData }

  for (const key in queryInfo) {
    if (queryInfo[key] === null) {
      delete queryInfo[key]
    }
  }
  queryInfo.createAt = queryInfo.createAt?.map((item: any) =>
    new Date(item + 28800000).toISOString()
  )
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

defineExpose({ fetchPageListData })

function handleNewUserClick() {
  emit('newClick')
}
</script>

<style scoped lang="less">
.content {
  padding: 0 20px;

  .n-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
