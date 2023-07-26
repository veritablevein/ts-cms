import { ref } from 'vue'
import PageModal from '@/components/page-modal/page-modal.vue'

type EditCBType = (data: any) => void

function usePageModal(editCallback?: EditCBType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setShowModal()
  }
  function handleEditClick(rowData: any) {
    modalRef.value?.setShowModal(false, rowData)
    if (editCallback) editCallback(rowData)
  }
  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
