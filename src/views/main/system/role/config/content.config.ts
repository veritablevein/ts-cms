const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
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
      title: '角色名称',
      key: 'name'
    },
    {
      type: 'normal',
      title: '权限介绍',
      key: 'intro'
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
      dialogContent: '确定删除角色吗？'
    }
  ]
}

export default contentConfig
