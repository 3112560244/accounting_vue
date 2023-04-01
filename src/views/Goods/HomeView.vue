<template>
  <div>
    <el-row>
      <el-card>
        <el-col :span="8">
          <el-card class="top-num">
              <span>待收货</span>
            {{this.waitNum}}
          </el-card>
        </el-col >
        <el-col :span="8">
          <el-card class="top-num">
              <span>待出售</span>
            {{this.sellNum}}
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="top-num">
              <span>快过期</span>
            {{this.adventNum}}
          </el-card>
        </el-col>
      </el-card>
    </el-row>

  </div>



</template>


<script>
import httpServer from "@/util/Axios";
export default {
  name: 'GoodsList',
  data(){
    return {
      waitNum: 0,
      sellNum: 0,
      adventNum: 0
    }
  },
  methods:{
    load(){
      // httpServer({
      //   url: '/v1/goods/getGoodeList',
      //   method: 'get',
      //
      // }).then(res => {
      //   console.log(res)
      //   if(res.code == 200){
      //     console.log(res.data)
      //     this.goodsList = res.data
      //   }else {
      //     this.$message.error(res.msg)
      //   }
      // })

      httpServer({
        url: '/v1/user',
        method:'get',
      }).then(res =>{
        console.log(res.data)
      })
    }
  },
  created() {
    this.load()
  },
}
</script>

<style scoped>
.top-num{
  margin-right: 10px;
  margin-bottom: 5px;
  height: 100px;
  background-color: #f8f8f8;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #000;
  font-weight: bold;
}

html, body {
  height: 100%;
  width: 100%;
}

body {
  background: url('@/assets/img/bg2.jpg') no-repeat;
  background-size: 100% 100%;
}

#goodslist td {
  border-top: 1px solid #39503f61;
}
</style>
