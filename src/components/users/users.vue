  <template>
  <div>
    <!-- 面包屑 -->
    <!-- 最好还是单独抽离一个组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户 -->
    <el-button>添加用户</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch @change="changeUserState(scope.row)" v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="280px">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete"></el-button>
        <el-button disabled>分配角色</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pagenum"
      :page-size="2"
      @current-change="changCurrent"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: null,
      // 总页数
      total: 0,
      // 当前页
      pagenum: 1
    }
  },
  created () {
    this.loadUsersList()
  },
  methods: {
    async loadUsersList () {
      await this.$axios
        .get('users', {
          params: {
            query: '',
            // 请求页数
            pagenum: this.pagenum,
            // 每页显示条数
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
    },
    changCurrent (page) {
      this.pagenum = page
      this.loadUsersList()
    },
    async changeUserState (row) {
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(`users/${id}/state/${mgState}`, null)
      console.log(res)

      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  background-color: #d4dae0;
  padding-left: 20px;
}
</style>
