<template>
  <el-row>
    <!-- 查询组件 -->
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <!-- 添加用户 -->
      <el-button>添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      searchText: ''
    }
  }
}
</script>
