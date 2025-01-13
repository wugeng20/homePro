<template>
  <div class="sidebar-box">
    <el-segmented v-model="value" :options="options" :direction="direction" @change="handleChange">
      <template #default="{ item }">
        <div class="sidebar-item">
          <el-icon size="20">
            <component :is="item.icon" />
          </el-icon>
          <div>{{ item.label }}</div>
        </div>
      </template>
    </el-segmented>
  </div>
</template>

<script setup>
import { SidebarOptions } from '@/config/SidebarOptions';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";

// 引入路由
const router = useRouter();
const route = useRoute();

// 菜单配置
const value = ref('home')
const direction = ref('')
const options = SidebarOptions

// 菜单点击事件
const handleChange = (Value) => {
  // console.log('Selected value changed to:', Value)
  const pageUrl = Value == 'home' ? '/' : '/' + Value
  router.replace({ path: pageUrl })
}

// 监听路由变化
watch(() => route.path, (newPath) => {
  try {
    if (newPath === '/') {
      value.value = 'home';
    } else {
      value.value = newPath.split('/')[1]; // 去掉开头的 '/'
    }
  } catch {
    value.value = 'home';
  }
});

</script>

<style lang="less" scoped>
.sidebar-box {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--rounded-lg);
  background: rgba(255, 255, 255, .5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);

  .el-segmented {
    --el-segmented-item-hover-bg-color: rgba(0, 0, 0, .1);
    --el-segmented-item-selected-bg-color: rgba(0, 0, 0, .1);
    --el-border-radius-base: var(--rounded-lg);
    --el-segmented-padding: 5px;
    --el-segmented-bg-color: transparent;
  }

  .sidebar-item {
    padding: 10px;
  }
}
</style>