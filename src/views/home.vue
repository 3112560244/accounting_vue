<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Your Vue.js App</h1>
    <el-button @click="submitForm"></el-button>
  </div>
</template>

<script>
// @ is an alias to /src

import httpServer from "@/util/Axios";

export default {
  name: 'HomeView',
  methods: {
    submitForm() {
      httpServer({
        url: '/v1/seckill/do_seckill',
        method: 'post',
        data: {
          goodsId: 1,
        },
        isForm: true
      }).then(res => {

        console.log(res)
        // localStorage.setItem('user', "123");
        // localStorage.setItem('user_token', JSON.stringify(res.data));
        // this.$router.push('/home');
      })
    },
  }
}
</script>
