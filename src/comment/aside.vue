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
      <el-submenu index="1">
        <!-- 标题 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="users">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <!-- 标题 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="roles">角色类表</el-menu-item>
        <el-menu-item index="rights">权限类表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <!-- 标题 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">商品列表</el-menu-item>
        <el-menu-item index="3-2">分类参数</el-menu-item>
        <el-menu-item index="3-3">商品分类</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <!-- 标题 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">角色类表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <!-- 标题 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="5-1">数据报表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {}
</script>

<style>
.el-menu {
  border: none;
}
</style>
