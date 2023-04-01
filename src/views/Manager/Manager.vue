<template>
  <div>
    <header class="fixed-header"><h2 style="text-align: center;">零食记账小程序</h2></header>
    <main class="scrollable-main">
      <router-view/>
    </main>
    <footer class="fixed-footer">
      <div class="navigation-links">
        <el-button @click="changeType(0)" :type="currentLink === 0 ? 'primary' : 'info'">主页</el-button>
        <el-button @click="changeType(1)" :type="currentLink === 1 ? 'primary' : 'info'">待收货商品</el-button>
        <el-button @click="changeType(2)" :type="currentLink === 2 ? 'primary' : 'info'">待出售商品</el-button>
        <el-button @click="changeType(3)" :type="currentLink === 3 ? 'primary' : 'info'">临期商品</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLink: null
    }
  },
  methods: {
    changeType(linkNumber) {
      this.currentLink = linkNumber;
        if (linkNumber === 1) {
          this.$router.push({ path: "/waitGoods" }).catch(err => {
            if (err.name !== "NavigationDuplicated") {
              throw err;
            }
          });
        } else if (linkNumber === 2) {
          this.$router.push({ path: "/sellGoods" }).catch(err => {
            if (err.name !== "NavigationDuplicated") {
              throw err;
            }
          });
        } else if (linkNumber === 3) {
          this.$router.push({ path: "/adventGoods" }).catch(err => {
            if (err.name !== "NavigationDuplicated") {
              throw err;
            }
          });
        } else if (linkNumber === 0) {
          this.$router.push({ path: "/home" }).catch(err => {
            if (err.name !== "NavigationDuplicated") {
              throw err;
            }
          });
        }

    }

  }
}
</script>

<style>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #f8f8f8;
}

.scrollable-main {
  margin-top: 60px; /* 保留头部高度 */
  margin-bottom: 40px; /* 保留底部高度 */
  overflow-y: auto; /* 滚动条样式 */
  height: calc(100vh - 100px); /* 计算剩余高度 */
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #f8f8f8;
  text-align: center;
  z-index: 1;
}

.navigation-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.navigation-links a {
  text-decoration: none;
  color: #333;
  flex: 1;
  text-align: center;
}

.navigation-links a.active-link {
  color: blue;
}
</style>
