<template>
  <section class="widget-container calendar-box">
    <div class="fix-box">
      <!-- 日历卡片 页面 -->
      <div class="calendar-card">
        <div class="cal-top">{{ curYear }} 年 {{ curMonth }} 月</div>
        <div class="cal-center">{{ curDay }}</div>
        <div class="cal-footer">
          <p class="cal-footer-d">第 {{ dayOfYear }} 天 第 {{ weekOfYear }} 周</p>
          <p class="cal-footer-w">{{ lunarDay }} {{ curWeek }}</p>
        </div>
      </div>
    </div>
    <!-- 日历表格 页面 -->
    <el-config-provider :locale="zhCn">
      <el-calendar ref="calendar" :locale="zhCn">
        <template #header="">
          <span></span>
        </template>
      </el-calendar>
    </el-config-provider>
  </section>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import { getLunar } from "chinese-lunar-calendar";
import { onMounted, ref } from "vue";

const curYear = ref(""); // 当前年份
const curMonth = ref(""); // 当前月份
const curDay = ref(""); // 当前日期
const curWeek = ref(""); // 当前周
const lunarDay = ref(""); // 农历日期
const dayOfYear = ref(""); // 当前日期是一年中的第几天
const weekOfYear = ref(""); // 当前日期是一年的第几周

onMounted(() => {
  // 初始化日历
  const date = new Date();
  curYear.value = date.getFullYear();
  curMonth.value = date.getMonth() + 1;
  curDay.value = date.getDate();

  const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const day = date.getDay();
  curWeek.value = weekday[day];

  const lunarDate = getLunar(curYear.value, curMonth.value, curDay.value);
  lunarDay.value = lunarDate.dateStr;
  // 获取当前时间是当年的第几天
  dayOfYear.value = Math.floor((date - new Date(curYear.value, 0, 0)) / 86400000);
  // 获取当前时间是当年的第几周
  const start = new Date(curYear.value, 0, 1);
  weekOfYear.value = Math.ceil((((date - start) / 86400000) + start.getDay() + 1) / 7);
});
</script>

<style scoped>
.calendar-box {
  display: flex;
  justify-content: space-between;
  gap: 5px;

  /* 日历卡片 */
  .fix-box {
    position: relative;
    width: 40%;
    height: 100%;
    border-radius: var(--rounded-lg);
    overflow: hidden;
    border: var(--el-border-width) var(--el-border-style) var(--el-border-color-lighter);

    .calendar-card {
      width: 100%;
      height: 100%;
      text-align: center;

      .cal-top {
        font-size: 20px;
        color: var(--el-bg-color);
        line-height: 3;
        height: 25%;
        background: var(--el-color-danger);
      }

      .cal-center {
        font-size: 5rem;
        font-weight: 600;
        height: 42%;
      }

      .cal-footer {
        height: 33%;
        line-height: 1.5;

        .cal-footer-d {
          font-size: 16px;
          color: var(--el-color-info);
        }

        .cal-footer-w {
          font-size: 18px;
        }
      }
    }
  }
}

/* 日历表格默认样式优化 */
:deep(.el-calendar) {
  width: 60%;
  font-size: 14px;

  .next {
    border: none;
  }

  td {
    border: none;

    &:first-child {
      border-left: none;
    }
  }

  .el-calendar-day {
    height: 30px !important;
    text-align: center;
    border: none;
  }

  .el-calendar__header {
    display: none;
  }

  .el-calendar__body {
    padding: 0;
  }
}
</style>
