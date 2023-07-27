<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menulist>
        <n-tree
          block-line
          cascade
          checkable
          :checked-keys="checkedKeys"
          :data="entireMenus"
          key-field="id"
          label-field="name"
          @update:checked-keys="updateCheckedKeys"
          @update:indeterminate-keys="updateIndeterminateKeys"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { NTree } from 'naive-ui'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/stores/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const checkedKeys = ref<Array<string | number>>([])
const indeterminateKeys = ref<Array<string | number>>([])
const otherInfo = computed(() => ({
  menuList: indeterminateKeys.value.concat(checkedKeys.value)
}))
function updateCheckedKeys(keys: Array<string | number>) {
  checkedKeys.value = keys
}
function updateIndeterminateKeys(keys: Array<string | number>) {
  indeterminateKeys.value = keys
}

function newCallback() {
  checkedKeys.value = []
}

function editCallback(rowData: any) {
  checkedKeys.value = mapMenuListToIds(rowData.menuList)
}

const { contentRef, handleResetClick, handleQueryClick } = usePageContent()

const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newCallback,
  editCallback
)
</script>

<style scoped lang="less">
.role {
}
</style>
