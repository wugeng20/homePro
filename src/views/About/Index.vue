<script setup>
import { getImageUrl } from '@/utils/public-use';

// 博客信息
const themeName = import.meta.env.VITE_THEME_NAME;
const version = import.meta.env.VITE_VERSION;
const buildTime = import.meta.env.VITE_SITE_START;

</script>

<template>
  <div class="page-layout about-box">
    <div class="about-header">
      <el-image class="about-header-img" :src="getImageUrl('icon/about-banner.png')" lazy />
    </div>
  </div>
  <div class="about-content">
    <el-row :gutter="20">
      <el-col :span="6" :xs="12">
        <div class="about-card">
          <p class="about-card-title">博客名称</p>
          <p class="about-card-content">星语的小木屋</p>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="about-card">
          <p class="about-card-title">主题名称</p>
          <p class="about-card-content">{{ themeName }}</p>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="about-card">
          <p class="about-card-title">主题版本</p>
          <p class="about-card-content">{{ version }}</p>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="about-card">
          <p class="about-card-title">建站时间</p>
          <p class="about-card-content">{{ buildTime }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.about-header {
  position: relative;
  width: 100%;
  height: 100%;

  .about-header-img {
    overflow: hidden;
    border-radius: var(--rounded-lg);
  }
}

.about-content {
  position: relative;
  margin-top: 10px;
  box-sizing: border-box;

  .about-card {
    text-align: center;
    position: relative;
    height: 100px;
    background: var(--el-mask-color-extra-light);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: var(--rounded-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .about-card-title {
      font-size: 24px;
      color: transparent;
      -webkit-text-stroke: 1px var(--el-color-info-dark-2);
      -webkit-mask: linear-gradient(#fff 50%, transparent);
      mask: linear-gradient(#fff 50%, transparent);
    }

    .about-card-content {
      color: var(--el-color-info-dark-2);
      font-weight: bold;
      font-size: 26px;
    }
  }
}
</style>
