import type { IModalConfig } from '@/components/page-modal/types'

const modalConfig: IModalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      placeholder: '请输入原价格'
    },
    {
      type: 'input',
      label: '新价格',
      prop: 'newPrice'
    },
    {
      type: 'input',
      label: '商品描述',
      prop: 'desc'
    },
    {
      type: 'input',
      label: '状态',
      prop: 'status'
    },
    {
      type: 'input',
      label: '图片',
      prop: 'imgUrl'
    },
    {
      type: 'input',
      label: '库存',
      prop: 'inventoryCount'
    },
    {
      type: 'input',
      label: '销量',
      prop: 'saleCount'
    },
    {
      type: 'input',
      label: '收藏',
      prop: 'favorCount'
    },
    {
      type: 'input',
      label: '地址',
      prop: 'address'
    }
  ]
}

export default modalConfig
