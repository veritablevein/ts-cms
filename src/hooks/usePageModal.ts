import { ref } from 'vue'
import PageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(
  newCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setShowModal()
    if (newCallback) newCallback()
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
