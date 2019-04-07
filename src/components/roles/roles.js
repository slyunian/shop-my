export default {
  data () {
    return {
      rolesList: [],
      // 是否打开
      rolesVisible: false,
      // 角色id
      editId: '',
      // 数据列表
      dataList: [],
      defaultProps: {
        // children : 结构
        children: 'children',
        // label : 显示名称
        label: 'authName'
      }
    }
  },
  methods: {
    // 获取编号
    getindex (index) {
      return index
    },
    // 获取数据
    async getTableData () {
      const res = await this.$axios.get('/roles')
      this.rolesList = res.data.data
      //   console.log(res)
    },
    // 获取树数据
    async getdataList () {
      let res = await this.$axios.get('rights/tree')
      //   console.log(res)
      this.dataList = res.data.data
    },
    // 展示已经勾选的
    showAssignRightsDialog (row) {
      this.editId = row.id
      this.rolesVisible = true
      console.log(row)
      let key = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            key.push(item3.id)
          })
        })
      })
      console.log(key)
      this.$nextTick(() => {
        // 设置勾选的内容
        this.$refs.tree.setCheckedKeys(key)
      })
    },
    // 提交权限
    async startAssignRights () {
      let key1 = this.$refs.tree.getHalfCheckedKeys()
      let key2 = this.$refs.tree.getCheckedKeys()
      let key = [...key1, ...key2]
      let res = await this.$axios.post(`roles/${this.editId}/rights`, {
        rids: key.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rolesVisible = false
        this.getTableData()
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      }
    }
  },
  //   注册钩子
  created () {
    // 获取数据
    this.getTableData()
    this.getdataList()
  }
}
