const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
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
      title: '部门名称',
      key: 'name'
    },
    {
      type: 'normal',
      title: '部门领导',
      key: 'leader'
    },
    {
      type: 'normal',
      title: '上级部门',
      key: 'parentId'
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
      dialogContent: '确定删除部门吗？'
    }
  ]
}

export default contentConfig
