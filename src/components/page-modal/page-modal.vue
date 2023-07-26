<template>
  <div class="modal">
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      transform-origin="center"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
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
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <n-form-item :label="item.label" :path="item.prop">
            <template v-if="item.type === 'input'">
              <n-input
                v-model:value="modalForm[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <n-select
                v-model:value="modalForm[item.prop]"
                :placeholder="item.placeholder"
                :options="item.options"
              />
            </template>
            <template v-if="item.type === 'date-picker'">
              <n-date-picker
                v-model:value="modalForm[item.prop]"
                type="daterange"
                clearable
              />
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </n-form-item>
        </template>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/stores/main/system/system'
import type { IModalProps } from './types'

const props = defineProps<IModalProps>()
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? null
}
const modalForm = reactive<any>(initialForm)

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
      const item = props.modalConfig.formItems.find(item => item.prop === key)
      modalForm[key] = item ? item.initialValue : null
    }
    editForm.value = null
  }
}
defineExpose({ setShowModal })

const systemStore = useSystemStore()
function handleConfirmClick() {
  let info = modalForm
  if (props.otherInfo) {
    info = { ...info, ...props.otherInfo }
  }
  if (!isNewRef.value && editForm.value) {
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editForm.value.id,
      info
    )
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, info)
  }
}
function handleCancelClick() {}
</script>

<style scoped lang="less">
.modal {
}
</style>
