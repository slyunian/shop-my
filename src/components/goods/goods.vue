<template>
  <div>
    <!-- 按钮 -->
    <el-button type="success" plain @click="$router.push('/goods-add')">添加商品</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量" width="180"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.add_time|timer}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import moment from 'moment';
export default {
  data () {
    return {
      // 显示表格数据
      tableData: []
    }
  },
  //   钩子函数
  created () {
    this.getdata()
  },
  methods: {
    async getdata () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      //   console.log(res)
      this.tableData = res.data.data.goods
    }
  },
  filters: {
    timer (res) {
      return moment(res).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>

<style>
</style>
