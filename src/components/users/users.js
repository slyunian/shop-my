export default {
  data () {
    return {
      tableData: null,
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 搜索内容
      searchText: '',
      // 是否弹出添加用户表单
      dialogFormVisible: false,
      // 是否弹出更改用户信息
      dialogUpdateVisible: false,
      // 表单规则
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 更新规则
      updateFrom: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur']
          }
        ],
        mobile: [
          { min: 10, max: 11, message: '请输入正确格式的手机', trigger: 'blur' }
        ]
      },
      // 分配角色弹框
      rolesVisible: false,
      // 分配角色表单对象
      assignRoleForm: {
        username: '测试',
        // 角色id
        rid: '',
        id: ''
      },
      rolesList: []
    }
  },
  created () {
    this.loadUsersList(1, this.searchText)
    this.loadRolesList()
  },
  methods: {
    // 加载数据
    async loadUsersList (pagenum = 1, query = '') {
      let res = await this.$axios.get('users', {
        params: {
          query,
          // 请求页数
          pagenum,
          // 每页显示条数
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      this.tableData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    // 切换页码
    changCurrent (page) {
      // this.pagenum = page
      this.$router.push('/users/' + page)
      this.loadUsersList(page, this.searchText)
    },
    // 搜索
    getsearch () {
      this.loadUsersList(1, this.searchText)
    },
    // 更改用户状态
    async changeUserState (row) {
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(`users/${id}/state/${mgState}`, null)
      // 提示更改成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    // 添加用户
    submitForm () {
      this.$refs.addForm.validate(async valid => {
        if (!valid) {
          return
        }
        let res = await this.$axios.post('users', this.addForm)
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // 页面个数可能会发生更改
        this.loadUsersList(this.pagenum)
        // 重置表单
        this.resetForm()
      })
    },
    // 重置表单
    resetForm () {
      this.$refs.addForm.resetFields()
      this.dialogFormVisible = false
    },
    // 删除单个用户
    async delUser (id) {
      let res = await this.$axios.delete(`users/${id}`)
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      this.loadUsersList()
    },
    // 编辑框赋值
    updateUser (userinfo) {
      console.log(userinfo)
      this.dialogUpdateVisible = true
      this.updateFrom.username = userinfo.username
      this.updateFrom.email = userinfo.email
      this.updateFrom.mobile = userinfo.mobile
      this.updateFrom.id = userinfo.id
      console.log(this.updateFrom)
    },
    async uUpdate () {
      let obj = {
        username: this.updateFrom.username,
        email: this.updateFrom.email,
        mobile: this.updateFrom.mobile
      }
      console.log(obj)
      let res = await this.$axios.put(`users/${this.updateFrom.id}`, obj)
      // 提示框
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 关闭编辑
      this.dialogUpdateVisible = false
      // 重新获取页面数据
      this.loadUsersList(this.pagenum)
    },
    // 加载分配角色下拉框内容
    async loadRolesList () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesList = res.data.data
    },
    // 显示当前的角色
    async showAssign (row) {
      const { username, id } = row
      // 用户名
      this.assignRoleForm.username = username
      this.assignRoleForm.id = id
      // 根据用户id可以找到角色id
      let res = await this.$axios.get('users/' + id)
      // rid=-1代表没有分配过角色的情况所以需要设置为''
      this.assignRoleForm.rid =
        res.data.data.rid === -1 ? '' : res.data.data.rid
      // 打开弹窗
      this.rolesVisible = true
    },
    // 分配新的角色
    async selectRoles () {
      const { id, rid } = this.assignRoleForm
      let res = await this.$axios.put(`users/${id}/role`, { rid })
      console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭弹框
        this.rolesVisible = false
        this.$message({
          message: '分配角色成功',
          type: 'success'
        })
        // 刷新列表
        this.loadRolesList()
      }
    }
  }
}
