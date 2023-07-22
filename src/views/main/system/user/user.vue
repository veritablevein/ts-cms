<template>
  <div class="user">
    <user-search
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <user-content ref="contentRef" @new-click="handleNewClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserModal from './c-cpns/user-modal.vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
function handleResetClick() {
  contentRef.value?.fetchUsersListData()
}
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}

const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  modalRef.value?.setShowModal()
}
</script>

<style scoped lang="less">
.user {
}
</style>
