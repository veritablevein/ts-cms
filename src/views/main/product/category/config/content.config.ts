const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建类别'
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
      title: '类别名称',
      key: 'name'
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
      dialogContent: '确定删除类别吗？'
    }
  ]
}

export default contentConfig
