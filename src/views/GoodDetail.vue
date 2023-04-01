<template>
  <div class="panel panel-default">
    <div class="panel-heading">秒杀商品详情</div>
    <div class="panel-body" v-if="!user_token">您还没有登录，请登陆后再操作</div>
    <table class="table" id="goodslist">
      <tr>
        <td>商品名称</td>
        <td colspan="3">{{ goods.goodsName }}</td>
      </tr>
      <tr>
        <td>商品图片</td>
        <td colspan="3"><img :src="goods.goodsImg" width="200" height="200"/></td>
      </tr>
      <tr>
        <td>秒杀开始时间</td>
        <td>{{ formatDate(goods.startDate) }}</td>
      </tr>
      <tr>
        <td id="seckillTip">
          <input type="hidden" id="remainSeconds" :value="remainSeconds"/>
          <span v-if="seckillStatus === 0">秒杀倒计时：</span>
          <span v-if="seckillStatus === 1">秒杀进行中</span>
          <span v-if="seckillStatus === 2">秒杀已结束</span>
        </td>
        <td>
          <span v-if="seckillStatus === 0"><span id="countDown">{{ remainSeconds }}</span>秒</span>
        </td>
        <td>
          <el-button @click="doSeckill">立即秒杀</el-button>
        </td>
      </tr>
      <tr>
        <td>商品原价</td>
        <td colspan="3">{{ goods.goodsPrice }}</td>
      </tr>
      <tr>
        <td>秒杀价</td>
        <td colspan="3">{{ goods.seckillPrice }}</td>
      </tr>
      <tr>
        <td>库存数量</td>
        <td colspan="3">{{ goods.stockCount }}</td>
      </tr>
    </table>


    <!-- 弹窗模板 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div style="text-align: center;">
        <p>正在秒杀中，请稍候...</p>
        <el-loading
          style="margin-top: 20px;"
          :fullscreen="false"
          :text="'秒杀中...'"
          :spinner="true"
          :background="'rgba(0, 0, 0, 0.7)'"
        ></el-loading>
      </div>
    </el-dialog>
  </div>



</template>

<script>
import httpServer from "@/util/Axios";
export default {
  name: "GoodDetail",
  data() {
    return {
      user_token: null,
      goods: {},
      remainSeconds: 0,
      endDate: 0,
      seckillStatus: 0,

      goodsId: 0,
      dialogVisible: false, // 控制弹窗的显示与隐藏
    };
  },

  // props: {
  //   user_token: null,
  //   goods: {},
  //   remainSeconds: 0,
  //   seckillStatus: 0,
  // },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.load();
    this.user_token = localStorage.getItem("user_token")?localStorage.getItem("user_token"):"";
  },
  methods: {
    load() {
      httpServer({
        url: "/v1/goods/getGoodDetail",
        method: 'post',
        data: {
          goodsId: this.goodsId,
        },
        isForm: true,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          console.log(res.data);
          this.goods = res.data;
          const startDate = new Date(res.data.startDate).getTime();
          const endDate = new Date(res.data.endDate).getTime();
          const now = new Date().getTime();
          if (now < startDate) {
            // 秒杀未开始
            this.remainSeconds = Math.floor((startDate - now)/1000);
            this.seckillStatus = 0;
          } else if (now < endDate) {
            // 秒杀进行中
            this.remainSeconds = Math.floor((endDate - now)/1000);
            this.seckillStatus = 1;
          } else {
            // 秒杀已结束
            this.seckillStatus = 2;
          }
          this.countDown();

        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 格式化日期
    formatDate(date) {
      return new Date(date).toLocaleString();
    },


    // 提交秒杀请求
    doSeckill() {
      if (this.seckillStatus !== 1) {
        // 秒杀未开始或已结束，不能提交秒杀请求
        return;
      }



      httpServer({
        url: "/v1/seckill/do_seckill",
        method: 'post',
        data: {
          goodsId: this.goodsId,
        },
        isForm: true,
      }).then((res) => {
        console.log(res);

        if (res.code == 200) {
          console.log(res.data);
          this.$message.success("提交成功");

          // 打开弹窗
          this.dialogVisible = true;

          // 轮询查询秒杀结果
          this.getResult();


        } else {
          console.log("doSeckill:"+res)
          this.$message.error(res.msg);
        }
      })
    },

    getResult(){
      httpServer({
        url: "/v1/seckill/result?goodsId="+this.goodsId,
        method: 'get',
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          console.log(res.data);
          if (res.data !== null ) {
            // 关闭弹窗
            this.dialogVisible = false;
            this.$message.success("秒杀成功");
          } else {
            setTimeout(() => {
              this.getResult();
            }, 1000);
          }
        } else {
          console.log("getResult:"+res)
          this.$message.error(res.msg);
        }
      });
    },

    countDown() {
      console.log("remainSeconds"+this.remainSeconds)
      const remainSeconds = this.remainSeconds;
      let timeout;
      if (remainSeconds > 0) {
        timeout = setTimeout(() => {
          this.remainSeconds = remainSeconds - 1;
          this.countDown();
        }, 1000);
      } else if (remainSeconds === 0) {
        clearTimeout(timeout);
        this.seckillStatus = 1;
      } else {
        clearTimeout(timeout);
        this.seckillStatus = 2;
      }



    },
  },
  mounted() {
    // this.countDown();
  },
};
</script>
