/* eslint-disable camelcase */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 切换tab
      activenum: 1,
      // 控制标签页
      activeName: '',
      // 添加商品数据
      form: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_isPromotion: false,
        // 富文本内容
        goods_introduce: '',
        // 收集上传图片的路径
        pics: []
      },
      // 富文本配置项
      editorOption: {
        placeholder: '请输入内容'
      },
      // 联动框数据
      options: [],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      //   照片墙
      dialogImageUrl: '',
      dialogVisible: false,
      // 请求头
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.loadCatList()
  },
  methods: {
    // 点击导航切换头部
    clickTabs (el) {
      this.activenum = +el.index + 1
    },
    // 下一页
    next (name, index) {
      this.activeName = name
      this.activenum = index
    },
    // 获取所有的分类
    async loadCatList () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      this.options = res.data.data
    },
    //   移除图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 图片预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传成功
    uploadSuccess (res) {
      // pic是数组
      this.form.pics.push({ pic: res.data.tmp_path })
    },
    // 添加商品
    async addGoods () {
      const {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat,
        goods_isPromotion,
        pics,
        goods_introduce
      } = this.form

      let res = await this.$axios.post('goods', {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat: goods_cat.join(','),
        goods_isPromotion,
        pics,
        goods_introduce
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          message: '添加商品成功',
          type: 'success'
        })
        this.$router.push('/goods')
      }
    }
  }
}
