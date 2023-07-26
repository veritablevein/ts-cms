const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  columns: [
    {
      type: 'normal',
      title: '菜单名称',
      key: 'name'
    },
    {
      type: 'normal',
      title: '级别',
      key: 'type'
    },
    {
      type: 'normal',
      title: '菜单url',
      key: 'url'
    },
    {
      type: 'normal',
      title: '菜单icon',
      key: 'icon'
    },
    {
      type: 'normal',
      title: '排序',
      key: 'sort'
    },
    {
      type: 'normal',
      title: '权限',
      key: 'permission'
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
      dialogContent: '确定删除菜单吗？'
    }
  ]
}

export default contentConfig
