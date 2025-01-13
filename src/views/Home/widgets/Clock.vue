<script setup>
import { getImageUrl } from '@/utils/public-use';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const siteName = import.meta.env.VITE_SITE_NAME

const percentage = ref(0)
const greeting = ref('下午好！') // 初始化问候语

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

const currentTime = ref('')
const currentDate = ref('')

const updateTimeAndProgress = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')

  currentTime.value = `${hours}:${minutes}`
  currentDate.value = `${day} ${month}/${date}`

  // 计算一天的剩余百分比
  const totalMinutesInDay = 24 * 60
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const remainingMinutes = totalMinutesInDay - currentMinutes
  percentage.value = Math.round((remainingMinutes / totalMinutesInDay) * 100)

  // 根据当前时间设置问候语
  const hour = now.getHours();
  if (hour >= 0 && hour < 6) {
    greeting.value = '凌晨好！'
  } else if (hour >= 6 && hour < 9) {
    greeting.value = '早上好！'
  } else if (hour >= 9 && hour < 12) {
    greeting.value = '上午好！'
  } else if (hour >= 12 && hour < 14) {
    greeting.value = '中午好！'
  } else if (hour >= 14 && hour < 18) {
    greeting.value = '下午好！'
  } else {
    greeting.value = '晚上好！'
  }
}

onMounted(() => {
  updateTimeAndProgress();
  setInterval(updateTimeAndProgress, 10000);
})

onBeforeUnmount(() => {
  clearInterval(updateTimeAndProgress)
})
</script>

<template>
  <section class="widget-container clock-box">
    <div class="clock-hello">
      <span>HI，{{ greeting }}欢迎来到{{ siteName }}。</span>
    </div>
    <div class="clock-content">
      <div class="clock-cover">
        <img :src="getImageUrl('icon/homeicon.png')">
      </div>
      <div>
        <p class="clock-time">{{ currentTime }}</p>
        <p class="clock-date">{{ currentDate }}</p>
        <div class="clock-progress">
          <el-progress :percentage="percentage" :color="customColors" :show-text="false" />
          <div class="clock-progress-text">
            <span>今日剩余</span>
            <span>{{ percentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
/* 时钟工具样式 */
.clock-box {
  --clock-top-height: 40px;
  position: relative;
  box-sizing: border-box;
  background-color: transparent !important;

  .clock-hello {
    width: 100%;
    height: var(--clock-top-height);
    font-size: 16px;
    font-weight: bold;
    padding-left: 10px;
    line-height: 2;
  }

  .clock-content {
    width: 100%;
    height: calc(100% - var(--clock-top-height));
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
    border-radius: var(--rounded-lg);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px;

    /*图片*/
    .clock-cover img {
      width: 100%;
      height: 140px;
    }

    /*时间*/
    .clock-time {
      font-size: 50px;
      font-weight: bold;
    }

    /*日期*/
    .clock-date {
      font-size: 20px;
      font-weight: bold;
    }

    /* 进度条 */
    .clock-progress {
      padding: 10px;

      .clock-progress-text {
        display: flex;
        font-size: 14px;
        margin-top: 5px;
        font-weight: normal;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>