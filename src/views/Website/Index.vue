<script setup>
import Search from '@/components/Search.vue';
import { WebsiteConfig } from '@/config/WebsiteConfig';
</script>

<template>
  <div class="website-container">
    <Search />
    <div class="page-layout website-box">
      <div v-if="WebsiteConfig" v-for="group in WebsiteConfig" :key="group.name" class="website-body">
        <div class="website-title">{{ group.name }}</div>
        <el-row class="website-list" :gutter="20">
          <el-col class="website-item" :span="3" :xs="6" v-for="link in group.links" :key="link.nickname">
            <a class="website-link" :href="link.url" :target="link.target">
              <el-image :src="link.avatar" />
            </a>
            <span>{{ link.nickname }}</span>
          </el-col>
        </el-row>
      </div>
      <div v-else><i class="loading-layout"></i></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.website-container {
  margin-top: 50px;
}

.website-body {
  .website-title {
    font-size: 40px;
    font-weight: bold;
    color: transparent;
    -webkit-text-stroke: 1px var(--el-text-color-secondary);
    -webkit-mask: linear-gradient(#fff 50%, transparent);
    mask: linear-gradient(#fff 50%, transparent);
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .website-list {
    padding: 10px 0;
  }

  .website-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 10px;
    padding: 0;

    .website-link {
      width: 70px;
      height: 70px;
      background-color: transparent;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border-radius: var(--rounded-lg);
      overflow: hidden;
      transition: all 0.2s;
    }

    span {
      font-size: 16px;
      line-height: 2.5;
      cursor: default;
      transition: all 0.2s;
    }

    &:hover {
      .website-link {
        transform: scale(1.1);
      }

      span {
        color: var(--el-bg-color);
      }
    }
  }
}
</style>
