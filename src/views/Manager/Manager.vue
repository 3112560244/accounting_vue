<template>
  <div>
    <header class="fixed-header">这是固定的头部</header>
    <main class="scrollable-main">
      <router-view />
    </main>
    <footer class="fixed-footer">
      <div class="navigation-links">
        <a href="#">待收货商品</a>
        <a href="#">待出售商品</a>
        <a href="#">临期商品</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
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
</style>
