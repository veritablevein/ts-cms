<template>
  <div class="modal">
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      transform-origin="center"
      title="新建用户"
      positive-text="确认"
      negative-text="算了"
      @positive-click="handleConfirmClick"
      @negative-click="handleCancelClick"
    >
      <n-form
        ref="formRef"
        :model="modalForm"
        size="large"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="用户名" path="name">
          <n-input v-model:value="modalForm.name" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="真实姓名" path="realname">
          <n-input
            v-model:value="modalForm.realname"
            placeholder="请输入真实姓名"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="modalForm.password"
            placeholder="请输入密码"
            type="password"
            show-password-on="mousedown"
          />
        </n-form-item>
        <n-form-item label="电话号码" path="cellphone">
          <n-input
            v-model:value="modalForm.cellphone"
            placeholder="请输入电话号码"
          />
        </n-form-item>
        <n-form-item label="选择角色" path="roleId">
          <n-select
            v-model:value="modalForm.roleId"
            :options="roleOptions"
            placeholder="请选择角色"
            remote
          />
        </n-form-item>
        <n-form-item label="选择部门" path="departmentId">
          <n-select
            v-model:value="modalForm.departmentId"
            :options="departmentOptions"
            placeholder="请选择部门"
            remote
          />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'

const showModal = ref(false)
function setShowModal() {
  showModal.value = true
}
defineExpose({ setShowModal })

const modalForm = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: null,
  departmentId: null
})

const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

function entireToOptions(entire: any) {
  return entire.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id
    }
  })
}

const roleOptions = computed(() => entireToOptions(entireRoles))
const departmentOptions = computed(() => entireToOptions(entireDepartments))

const systemStore = useSystemStore()
function handleConfirmClick() {
  systemStore.newUserDataAction(modalForm)
}
function handleCancelClick() {}
</script>

<style scoped lang="less">
.modal {
}
</style>
