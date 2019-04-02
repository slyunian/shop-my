<template>
  <el-container class="home">
    <el-header class="home-header">
      <el-row>
        <el-col :span="8">
          <!-- logo -->
          <div class="head-left">
            <img src="../../comment/img/logo.png">
          </div>
        </el-col>
        <el-col :span="8" align="middle" justify="center">
          <div class="head-center">
            <h3>黑马会员管理系统</h3>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="head-right">
            富婆年年有,今年特别多
            <a href="javascript:;" @click="isoutlogin()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="home-aside">Aside</el-aside>
      <el-main class="home-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // beforeCreate () {
  //   if (!localStorage.getItem('userinfo')) {
  //     this.$message({
  //       type: 'warning',
  //       message: '请先登录'
  //     })
  //     this.$router.push('/login')
  //   }
  // },
  methods: {
    isoutlogin () {
      this.$confirm('是否退出登录', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.$router.push('/login')
          localStorage.removeItem('userinfo')
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel' ? '已取消退出' : '已经取消退出'
          })
        })
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}

/* 头部 */
.home-header {
  height: 100%;
  min-width: 900px;
  background-color: #b3c1cd;
}
.head-center {
  color: #ffffff;
  font-size: 28px;
  line-height: 60px;
}
.head-right {
  line-height: 60px;
  float: right;
  padding-right: 30px;
}
.head-right a {
  color: #daa520;
}

/* 侧边 */
.home-aside {
  height: 100%;
  background-color: #545c64;
}
.home-main {
  height: 100%;
  background-color: #eaeef1;
}
</style>
