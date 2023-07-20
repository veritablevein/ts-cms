<template>
  <div class="content">
    <n-card>
      <template #header>
        <n-space justify="space-between">
          <h3>用户列表</h3>
          <n-button type="primary"> 新建数据 </n-button>
        </n-space>
      </template>
      <n-data-table
        :single-line="false"
        :columns="columns"
        :data="usersList"
        :pagination="pagination"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import type { IUserInfo } from '@/types'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton, NIcon, NTag } from 'naive-ui'
import { h, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import EditIcon from '@/components/icons/edit-icon.vue'
import DeleteIcon from '@/components/icons/delete-icon.vue'

const systemStore = useSystemStore()
systemStore.postUsersListAction()

const { usersList } = storeToRefs(systemStore)

const rowKey = (row: IUserInfo) => row.id
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
}

const createColumns = (): DataTableColumns<IUserInfo> => [
  {
    type: 'selection',
    disabled(row: IUserInfo) {
      return row.id === 1
    },
    align: 'center'
  },
  {
    title: '序号',
    key: 'id',
    render: (_, index) => {
      return `${index + 1}`
    },
    align: 'center'
  },
  {
    title: '用户名',
    key: 'name',
    align: 'center'
  },
  {
    title: '真实姓名',
    key: 'realname',
    align: 'center'
  },
  {
    title: '手机号码',
    key: 'cellphone',
    align: 'center'
  },
  {
    title: '状态',
    key: 'enable',
    align: 'center',
    render(row) {
      return h(
        NTag,
        {
          type: row.enable ? 'info' : 'error'
        },
        {
          default: () => (row.enable ? '启用' : '禁用')
        }
      )
    }
  },
  {
    title: '创建时间',
    key: 'createAt',
    align: 'center',
    render(raw) {
      return formatUTC(raw.createAt!)
    }
  },
  {
    title: '更新时间',
    key: 'updateAt',
    align: 'center',
    render(raw) {
      return formatUTC(raw.updateAt!)
    }
  },
  {
    title: '操作',
    key: '',
    render(row) {
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
            renderIcon: () => h(NIcon, null, { default: () => h(EditIcon) }),
            onClick: () => ''
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
            renderIcon: () => h(NIcon, null, { default: () => h(DeleteIcon) }),
            onClick: () => ''
          },
          { default: () => '删除' }
        )
      ]
    },
    align: 'center'
  }
]

const columns = createColumns()

const paginationReactive = reactive({
  page: 1,
  pageSizes: [5, 10, 20, 30],
  pageSize: 5,
  showSizePicker: true,
  showQuickJumper: true,
  prefix({ itemCount }: { itemCount: number }) {
    return `共 ${itemCount} 条`
  }
})
const pagination = paginationReactive

function handlePageChange(page: number) {
  paginationReactive.page = page
}

function handlePageSizeChange(pageSize: number) {
  paginationReactive.pageSize = pageSize
}
</script>

<style scoped lang="less">
.content {
  padding: 0 20px;
}
</style>
