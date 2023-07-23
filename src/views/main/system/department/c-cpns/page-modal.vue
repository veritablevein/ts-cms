<template>
  <div class="modal">
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      transform-origin="center"
      :title="isNewRef ? '新建部门' : '编辑部门'"
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
        <n-form-item label="部门名称" path="name">
          <n-input
            v-model:value="modalForm.name"
            placeholder="请输入部门名称"
          />
        </n-form-item>
        <n-form-item label="部门领导" path="leader">
          <n-input
            v-model:value="modalForm.leader"
            placeholder="请输入部门领导"
          />
        </n-form-item>
        <n-form-item label="选择上级部门" path="parentId">
          <n-select
            v-model:value="modalForm.parentId"
            :options="departmentOptions"
            placeholder="请选择上级部门"
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

const isNewRef = ref(true)
const editForm = ref()
const showModal = ref(false)
function setShowModal(isNew: boolean = true, rowData?: any) {
  showModal.value = true
  isNewRef.value = isNew
  if (!isNew && rowData) {
    for (const key in modalForm) {
      modalForm[key] = rowData[key]
    }
    editForm.value = rowData
  } else {
    for (const key in modalForm) {
      modalForm[key] = null
    }
    editForm.value = null
  }
}
defineExpose({ setShowModal })

const modalForm = reactive<any>({
  name: '',
  leader: null,
  parentId: null
})

const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

function entireToOptions(entire: any) {
  return entire.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id
    }
  })
}

const departmentOptions = computed(() => entireToOptions(entireDepartments))

const systemStore = useSystemStore()
function handleConfirmClick() {
  if (!isNewRef.value && editForm.value) {
    systemStore.editPageDataAction('department', editForm.value.id, modalForm)
  } else {
    systemStore.newPageDataAction('department', modalForm)
  }
}
function handleCancelClick() {}
</script>

<style scoped lang="less">
.modal {
}
</style>
