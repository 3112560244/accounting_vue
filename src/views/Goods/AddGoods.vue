<template>
  <div>
    <h1>添加商品</h1>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item label="总数量" prop="name">
        <el-input v-model="form.quantity"></el-input>
      </el-form-item>
      <el-form-item label="总价格" prop="name">
        <el-input v-model="form.price"></el-input>
      </el-form-item>


<!--      <el-form-item label="商品价格" prop="price">-->
<!--        <el-input v-model="form.price"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="商品数量" prop="num">-->
<!--        <el-input v-model="form.num"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="商品日期" prop="date">-->
<!--        <el-date-picker-->
<!--          v-model="form.date"-->
<!--          type="date"-->
<!--          placeholder="选择日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="商品状态" prop="status">-->
<!--        <el-select v-model="form.status" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import httpServer from "@/util/Axios";
import axios from "axios";
export default {
  name: "AddGoods",
  data(){
    return{
      form:{},
      options:[{
        label: '待出售',
        value: '待出售'
      },{
        label: '临期',
        value: '临期'
      }],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // price: [
        //   { required: true, message: '请输入商品价格', trigger: 'blur' },
        //   { type: 'number', message: '请输入数字值', trigger: 'blur' }
        // ],
        // num: [
        //   { required: true, message: '请输入商品数量', trigger: 'blur' },
        //   { type: 'number', message: '请输入数字值', trigger: 'blur' }
        // ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }

    }
  },
  methods:{
    onSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: '/v1/goods/addGoods?price='+this.form.price+'&quantity='+this.form.quantity,
            headers: {
              'Content-Type': 'application/json',
              'token':JSON.parse(localStorage.getItem('user_token'))?JSON.parse(localStorage.getItem('user_token')):''
            },
            data: this.form
          })
            .then(res => {
              if (res.data.code === 200){
                this.$message({
                  message: "添加成功",
                  type: 'success'
                });
              }else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }

            })
            .catch(error => {
              console.log(error);
            });



          // axios({
          //   method:"post",
          //   url:"/v1/goods/addGoods",
          //   headers:{
          //     'Content-Type': 'application/json; charset=UTF-8',
          //     'token':JSON.parse(localStorage.getItem('user_token'))?JSON.parse(localStorage.getItem('user_token')):''
          //   },
          //
          //   data:{
          //     goods:this.form,
          //     price: 100,
          //     quantity: 10
          //   },
          //   // params: {
          //   //
          //   // },
          //
          // })

          // httpServer({
          //   url:'/v1/goods/addGoods',
          //   method:'post',
          //   data:{
          //     goods:this.form,
          //     price:100,
          //     quantity: 10
          //   }
          // })

        }
      });
    }
  }
}
</script>

<style scoped>

</style>