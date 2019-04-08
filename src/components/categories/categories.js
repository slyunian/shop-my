export default {
  data () {
    return {
      // 分类数据
      tableData: [],
      // 控制弹出框显示
      dialogVisible: false,
      // 添加的数据
      addForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      // 配置项
      defaulProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      options: []
    }
  },
  created () {
    this.getCateList()
    this.getCateList2()
  },
  methods: {
    // 获取分类数据
    async getCateList () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)

      this.tableData = res.data.data.result
    },

    // 点击发送分类数据数据
    async getCateList2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.options = res.data.data
    },
    // 显示添加分类对话框
    async startAddCat () {
      // eslint-disable-next-line camelcase
      let { cat_name, cat_pid_arr } = this.addForm
      // console.log(this.addForm)
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], // 父类父id  数组最后一个元素
        cat_name,
        cat_level: cat_pid_arr.length // 层级  == 数组的长度
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.dialogVisible = false
        this.getCateList()
        this.getCateList2()
        // this.resetField()
      }
    }
  }
}
