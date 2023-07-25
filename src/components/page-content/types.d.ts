export interface IColumn {
  type: string
  title: string
  key: string
  align?: 'left' | 'right' | 'center' | undefined
  dialogContent?: string
}

export interface IContentProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    columns: IColumn[]
  }
}
