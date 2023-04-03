<template>
  <div>
    <h1>临期</h1>
    <el-table :data="tableData">
      <el-table-column prop="name" width="80" label="商品名称"></el-table-column>
      <!--      <el-table-column prop="shopName" label="店铺名称"></el-table-column>-->
      <el-table-column prop="quantity" width="50" label="数量"></el-table-column>
<!--      <el-table-column prop="makeTime" width="90" label="生产日期"></el-table-column>-->
<!--      <el-table-column prop="expireTime" width="90" label="保质期"></el-table-column>-->

      <el-table-column prop="adventTime" width="90" label="到期日期"></el-table-column>

      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            class="ml-5"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定已处理了吗？"
            @confirm="change(scope.row.id)"
          >
            <el-button type="danger" slot="reference">已处理</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import httpServer from "@/util/Axios";

export default {
  name: "AdventGoods",
  data(){
    return {
      tableData:[]
    }
  },
  methods:{
    load(){
      httpServer({
        method:'get',
        url:'/v1/orders/getAdventOrder',
      }).then(res =>{
        if (res.code === 200){

          // 计算过期时间
          res.data.forEach(item => {


            const date= new Date(Date.parse(item.makeTime) + item.expireTime * 24 * 3600 * 1000);

            const year = date.getFullYear(); // 年
            const month = date.getMonth() + 1; // 月，注意月份是从0开始计算的，所以需要加1
            const day = date.getDate(); // 日
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            item.adventTime = formattedDate

            const date1 = new Date(Date.parse(item.makeTime));

            const year1 = date.getFullYear(); // 年
            const month1 = date.getMonth() + 1; // 月，注意月份是从0开始计算的，所以需要加1
            const day1 = date.getDate(); // 日
            const formattedDate1 = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            item.makeTime = formattedDate1
          });
          this.tableData = res.data
        }else {
          //报错信息弹窗
          this.$message.error(res.msg);
        }
      })
    },
    change(id) {
      httpServer({
        method: 'post',
        url: '/v1/orders/updateOrder',
        data: {
          id: id,
          sell: true,
        },
        isForm: true
      }).then(res => {
        if (res.code === 200) {

          this.$message.success(res.msg);
          this.load()
        } else {
          //报错信息弹窗
          this.$message.error(res.msg);
        }
      })
    }
  },
  created(){
    this.load()
  }
}
</script>

<style scoped>

</style>