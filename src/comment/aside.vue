<template>
  <el-col>
    <!-- router:false=>true  => 启动路由功能  默认为false-->
    <!-- unique-opened只有一个子菜单展开 -->
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      unique-opened
      default-active="/"
    >
      <el-submenu :index="item1.id+''" v-for="item1 in asideData" :key="item1.id">
        <!-- 标题 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item1.authName}}</span>
        </template>
        <el-menu-item
          v-for="item2 in item1.children"
          :key="item2.id"
          :index="'/'+item2.path"
        >{{item2.authName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  data () {
    return {
      asideData: ''
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    async getdata () {
      let res = await this.$axios.get('menus')
      this.asideData = res.data.data
      console.log(res.data.data)
    }
  }
}
</script>

<style>
.el-menu {
  border: none;
}
</style>
