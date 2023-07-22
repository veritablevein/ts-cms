<template>
  <div class="content">
    <n-card>
      <template #header>
        <n-space justify="space-between">
          <h3>用户列表</h3>
          <n-button type="primary" @click="handleNewUserClick">
            新建数据
          </n-button>
        </n-space>
      </template>
      <n-data-table
        :single-line="false"
        :columns="columns"
        :data="usersList"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      />
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40, 50]"
        :display-order="['size-picker', 'pages', 'quick-jumper']"
        :item-Count="usersTotalCount"
        show-size-picker
        show-quick-jumper
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <template #prefix="{ itemCount }"> 共 {{ itemCount }} 页 </template>
      </n-pagination>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import type { IUserInfo } from '@/types'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton, NIcon, NTag, useDialog } from 'naive-ui'
import { h, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import EditIcon from '@/components/icons/edit-icon.vue'
import DeleteIcon from '@/components/icons/delete-icon.vue'

const dialog = useDialog()
const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()

const page = ref(1)
const pageSize = ref(10)

fetchUsersListData()

const { usersList, usersTotalCount } = storeToRefs(systemStore)

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
          type: row.enable ? 'success' : 'error'
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
            renderIcon: () => h(NIcon, null, { default: () => h(DeleteIcon) }),
            onClick: () => {
              dialog.warning({
                title: '警告',
                content: '确定删除用户吗？',
                positiveText: '确定',
                negativeText: '算了',
                onPositiveClick: () => {
                  systemStore.deleteUserByIdAction(row.id!)
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
]

const columns = createColumns()

function handlePageChange() {
  fetchUsersListData()
}

function handlePageSizeChange() {
  fetchUsersListData()
}

function fetchUsersListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (page.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formData }
  queryInfo.createAt = queryInfo.createAt?.map((item: any) =>
    new Date(item + 28800000).toISOString()
  )
  systemStore.postUsersListAction(queryInfo)
}

defineExpose({ fetchUsersListData })

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
