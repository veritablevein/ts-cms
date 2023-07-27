export interface formItem {
  type: string
  prop: string
  label: string
  placeholder?: string
  initialValue?: string
  options?: Array<SelectOption | SelectGroupOption>
}

export interface ISearchProps {
  searchConfig: {
    pageName: string
    formItems: formItem[]
  }
}
