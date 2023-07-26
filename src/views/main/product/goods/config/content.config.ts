const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  columns: [
    {
      type: 'selection',
      title: '',
      key: 'selection'
    },
    {
      type: 'no.',
      title: '序号',
      key: 'id'
    },
    {
      type: 'normal',
      title: '商品名称',
      key: 'name',
      maxWidth: 120,
      resizable: true
    },
    {
      type: 'normal',
      title: '原价格',
      key: 'oldPrice'
    },
    {
      type: 'normal',
      title: '新价格',
      key: 'newPrice'
    },
    {
      type: 'normal',
      title: '商品描述',
      key: 'desc',
      maxWidth: 120,
      resizable: true
    },
    {
      type: 'normal',
      title: '状态',
      key: 'status'
    },
    {
      type: 'image',
      title: '图片',
      key: 'imgUrl'
    },
    {
      type: 'normal',
      title: '库存',
      key: 'inventoryCount'
    },
    {
      type: 'normal',
      title: '销量',
      key: 'saleCount'
    },
    {
      type: 'normal',
      title: '收藏',
      key: 'favorCount'
    },
    {
      type: 'normal',
      title: '地址',
      key: 'address'
    },
    {
      type: 'time',
      title: '创建时间',
      key: 'createAt'
    },
    {
      type: 'time',
      title: '更新时间',
      key: 'updateAt'
    },
    {
      type: 'handler',
      title: '操作',
      key: '',
      dialogContent: '确定删除商品吗？'
    }
  ]
}

export default contentConfig
