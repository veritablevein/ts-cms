import { ref } from 'vue'
import PageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setShowModal()
  }
  function handleEditClick(rowData: any) {
    modalRef.value?.setShowModal(false, rowData)
  }
  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
