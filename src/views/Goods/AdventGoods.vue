<template>
  <div>
    <h1>临期</h1>
    <el-table :data="tableData">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdventGoods",
  data(){
    return {
      tableData:[{
        name: '玉米1',
        price: '10',
        num: '100',
        date: '2020-10-10',
        status: '临期'
      },{
        name: '玉米2',
        price: '10',
        num: '100',
        date: '2020-10-10',
        status: '临期'
      },{
        name: '玉米3',
        price: '10',
        num: '100',
        date: '2020-10-10',
        status: '临期'
      },
        {
          name: '玉米4',
          price: '10',
          num: '100',
          date: '2020-10-10',
          status: '临期'
        },

      ]
    }
  }
}
</script>

<style scoped>

</style>