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
            <a @click.prevent="isoutlogin()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="home-aside">
        <Aside></Aside>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
import Aside from "@/comment/aside.vue";
export default {
  methods: {
    //更改前退出逻辑
    isoutlogin1() {
      this.$confirm("是否退出登录", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除token
          localStorage.removeItem("token");
          // 跳转页面
          this.$router.push("/login");
          // 提示删除成功
          this.$message({
            type: "success",
            message: "退出成功",
            duration: 500
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration: 500
          });
        });
    },
    //更改后退出逻辑
    async isoutlogin() {
      // 将可能报错的代码放在try内执行
      try {
        await this.$confirm("是否退出登录", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "退出",
          cancelButtonText: "取消",
          type: "warning"
        });
        // 删除token
        localStorage.removeItem("token");
        // 跳转页面
        this.$router.push("/login");
        // 提示删除成功
        this.$message({
          type: "success",
          message: "退出成功",
          duration: 500
        });
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消退出",
          duration: 500
        });
      }
    }
  },
  components: {
    Aside
  }
};
</script>

<style scoped lang='less'>
.home {
  height: 100%;
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
  //内容
  .home-main {
    height: 100%;
    background-color: #eaeef1;
  }
}
</style>
