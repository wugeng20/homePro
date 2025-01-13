<template>
  <footer class="footer">
    <span>© 2023-2024 {{ siteName }}. All rights reserved.</span>
    <a href="http://beian.miit.gov.cn/" rel="noreferrer" target="_blank">&nbsp;&nbsp;{{ siteIcp }}</a>
    <a :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${siteGaId}`" rel="noreferrer"
      target="_blank">&nbsp;&nbsp;{{ siteGa }}</a>
  </footer>
</template>

<script setup>
// 博客信息
const siteName = import.meta.env.VITE_SITE_NAME;
const siteIcp = import.meta.env.VITE_SITE_ICP;
const siteGa = import.meta.env.VITE_SITE_GA;
const siteGaId = import.meta.env.VITE_SITE_GA_ID;
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  color: var(--el-text-color-primary);
  font-size: 14px;
  background: var(--el-mask-color-extra-light);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
