<template>
  <el-row type="flex" justify="center" align="middle" class="row1">
    <el-col :span="8" class="col1">
      <el-form class="form" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startLogin()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return
        }
        this.$axios.post('login', this.ruleForm).then(res => {
          // 判断是否登录成功
          if (res.data.meta.status === 200) {
            // 存储token值
            localStorage.setItem('token', res.data.data.token)
            this.$message({
              type: 'success',
              message: '登录成功',
              duration: 500
            })
            this.$router.push('/home')
            // 登录保持--my
            // localStorage.setItem('userinfo', JSON.stringify(this.ruleForm))
          } else {
            this.$message({
              type: 'error',
              message: '登录失败',
              duration: 500
            })
          }
        })
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped>
.row1 {
  height: 100%;
  background: #2d434c;
}

.col1 {
  background: #fff;
  padding: 25px 50px 0 30px;
  border-radius: 5px;
}
</style>
