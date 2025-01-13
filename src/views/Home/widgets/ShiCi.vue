<template>
  <section class="widget-container shici-box">
    <Transition name="fade" mode="out-in">
      <div :key="ShiCiData.text">
        <div class="shici-quote-icon">
          <svg t="1733410692358" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7579"
            width="50" height="50">
            <path
              d="M585.1648 584.5504c0-78.336 24.5248-157.8496 95.0784-234.7008C707.7376 311.808 776.6528 274.0224 870.4 256v93.8496c-142.6432 57.6-173.312 179.0464-156.1088 187.7504h108.544c26.2656 0 47.5648 20.992 47.5648 46.9504v187.6992a47.2576 47.2576 0 0 1-47.5648 46.9504h-190.1568a47.2576 47.2576 0 0 1-47.5136-46.9504v-187.6992z m-380.3648 0c0-78.336 24.576-157.8496 95.0784-234.7008C327.424 311.808 396.288 274.0224 490.0352 256v93.8496C347.4432 407.4496 316.7744 528.896 333.9776 537.6h108.544c26.2656 0 47.5136 20.992 47.5136 46.9504v187.6992a47.2576 47.2576 0 0 1-47.5136 46.9504H252.3648A47.2576 47.2576 0 0 1 204.8 772.2496v-187.6992z"
              fill="rgba(255, 255, 255, 0.3)" p-id="7580"></path>
          </svg>
        </div>
        <p class="shici-text line-clamp">{{ ShiCiData.text }}</p>
        <p class="shici-from">《 {{ ShiCiData.title }} 》&bull; {{ ShiCiData.dynasty }} &bull; {{ ShiCiData.author }}</p>
      </div>
    </Transition>
    <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
      <el-button color="#ffcb7c" plain class="shici-update-btn" :icon="ArrowRightBold" @click="updateShici" circle />
    </el-tooltip>
  </section>
</template>

<script setup>
import { getShici } from '@/api';
import debounce from "@/utils/debounce.js";
import { ArrowRightBold } from '@element-plus/icons-vue';
import { onMounted, reactive } from 'vue';

// 一言数据
const ShiCiData = reactive({
  text: "林深径曲入幽境，夜静星明照小楼。",
  title: "无题",
  dynasty: "现代",
  author: "佚名",
});

const getShiciData = async () => {
  try {
    const { data } = await getShici();
    ShiCiData.text = data.quotes;
    ShiCiData.title = data.title;
    ShiCiData.dynasty = data.dynasty;
    ShiCiData.author = data.author;
  } catch (error) {
    ElMessage({
      message: "诗词一言获取失败",
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
    ShiCiData = {
      text: "林深径曲入幽境，夜静星明照小楼。",
      title: "无题",
      dynasty: "现代",
      author: "佚名",
    }
  }
};

// 更新诗词数据
const updateShici = debounce(() => {
  getShiciData();
}, 500);

onMounted(() => {
  getShiciData();
})
</script>

<style lang="less" scoped>
.shici-box {
  background-color: var(--el-color-danger-dark-2) !important;
  color: #ffcb7c;

  .shici-text {
    font-size: 24px;
    font-weight: bold;
    margin: 0 10px;
    -webkit-line-clamp: 3;
  }

  .shici-from {
    position: absolute;
    left: 20px;
    bottom: 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &::before {
      content: "";
      width: 5px;
      height: 15px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: var(--rounded-lg);
    }
  }

  .shici-update-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
