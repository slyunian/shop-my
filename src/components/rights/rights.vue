<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="getIndex"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          authName: '',
          path: '',
          level: ''
        }
      ]
    }
  },
  methods: {
    async getlist () {
      const res = await this.$axios.get('rights/list')
      console.log(res)
      // 赋值
      this.tableData = res.data.data
    },
    // 更改编号
    getIndex (index) {
      return index
    }
  },
  created () {
    this.getlist()
  }
}
</script>

<style scoped>
el-breadcrumb {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding-left: 20px;
  background: #d4dae0;
}
</style>
