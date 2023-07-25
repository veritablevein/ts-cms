import { ref } from 'vue'
import PageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  function handleQueryClick(formData: any) {
    contentRef.value?.fetchPageListData(formData)
  }

  return {
    contentRef,
    handleResetClick,
    handleQueryClick
  }
}

export default usePageContent
