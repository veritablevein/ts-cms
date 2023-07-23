<template>
  <div class="department">
    <page-search
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
function handleQueryClick(formData: any) {
  contentRef.value?.fetchPageListData(formData)
}
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setShowModal()
}
function handleEditClick(rowData: any) {
  modalRef.value?.setShowModal(false, rowData)
}
</script>

<style scoped lang="less">
.department {
}
</style>
