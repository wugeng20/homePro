<script setup>
import { getImageUrl } from '@/utils/public-use';
</script>

<template>
  <div class="page-layout not-found">
    <el-result title="404" sub-title="Sorry, request error">
      <template #icon>
        <el-image :src="getImageUrl('icon/404.png')" lazy />
      </template>
      <template #extra>
        <el-button type="info" @click="$router.push('/')">首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="less" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
