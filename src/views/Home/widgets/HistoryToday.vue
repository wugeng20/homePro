<script setup>
import { getHistory } from '@/api';
import { getCurrentTime } from "@/utils/public-use";
import { ElMessage, ElPagination } from 'element-plus';
import { onMounted, reactive, ref } from "vue";

const getCurrentTimeData = getCurrentTime();

const historyToday = reactive({
  day: `${getCurrentTimeData.year}年${getCurrentTimeData.month}月${getCurrentTimeData.day}日`,
  data: []
});

const currentPage = ref(1);
const pageSize = ref(5);

const getHistoryToday = async () => {
  try {
    const { data } = await getHistory();
    historyToday.data = data.data;
  } catch (error) {
    ElMessage({
      message: "获取历史的今天数据失败",
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
    historyToday.data = [{
      "year": 2024,
      "title": "获取历史的今天数据失败",
      "link": "/"
    }];
  }
}

onMounted(() => {
  getHistoryToday();
})

const handlePageChange = (page) => {
  currentPage.value = page;
}
</script>

<template>
  <section class="widget-container history-today-box">
    <div class="history-today-head">
      <h3>历史上的今天</h3>
      <time class="history-today-date">
        {{ historyToday.day }}
      </time>
      <el-pagination class="history-today-pagination" layout="prev, next" size="small" :total="historyToday.data.length"
        :page-size="pageSize" v-model:current-page="currentPage" @current-change="handlePageChange" />
    </div>
    <ul class="history-today-content">
      <li class="history-today-item"
        v-for="(item, index) in historyToday.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        :key="index">
        <span>{{ item.year }}年</span>
        {{ item.title }}
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
.history-today-box {
  @history-head-height: 35px;
  @history-bg-color: var(--el-bg-color);
  @history-padding: 10px;

  position: relative;
  padding: @history-padding;
  background-color: transparent !important;

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 160px;
    height: 50px;
    background-color: @history-bg-color;
    z-index: -1;
    border-top-left-radius: var(--rounded-lg);
    border-top-right-radius: var(--rounded-lg);
  }

  &::before {
    content: "";
    position: absolute;
    top: 27px;
    left: 130px;
    width: 75px;
    height: 40px;
    background-color: @history-bg-color;
    z-index: -1;
    transform: rotate(50deg);
    border-radius: var(--rounded-lg);
  }

  .history-today-head {
    position: relative;
    width: 100%;
    height: @history-head-height;
    padding-left: @history-padding + 10px;
    line-height: 2.5;

    .history-today-date {
      position: absolute;
      top: 0;
      left: 50%;
      font-size: 12px;
      color: var(--el-text-color-primary);
    }

    .history-today-pagination {
      position: absolute;
      top: 0;
      right: @history-padding;
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      :deep(button) {
        display: flex;
        padding: 4px;
        border: none;
        border-radius: 5px;

        &:hover {
          background-color: var(--el-mask-color-extra-light);
        }
      }
    }
  }

  .history-today-content {
    height: calc(100% - @history-head-height);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: @history-padding;
    padding: @history-padding;
    background-color: @history-bg-color;
    border-radius: var(--rounded-lg);
    border-top-left-radius: 0;
    overflow: hidden;

    .history-today-item {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: normal;

      span {
        color: var(--el-color-info-dark-2);
        background-color: var(--el-color-info-light-7);
        padding: 2px 4px;
        border-radius: 5px;
      }
    }
  }
}
</style>