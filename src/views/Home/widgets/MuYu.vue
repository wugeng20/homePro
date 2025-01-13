<script setup>
import sound from '@/assets/mp3/sound.mp3';
import { Check, Close, RefreshRight } from '@element-plus/icons-vue';
import { nextTick, onUnmounted, ref } from 'vue';

// 使用LocalStorage存储merit
const merit = ref(parseInt(localStorage.getItem('merit')) || 0);

// 木鱼动画
const meritPopups = ref([]);
const audioRef = ref(null);
const isAnimating = ref(false);

// 敲木鱼
const strikeFish = async () => {
  merit.value++;
  localStorage.setItem('merit', merit.value);

  // 创建新的功德弹窗
  const popupId = Date.now().toString() + meritPopups.value.length.toString();
  meritPopups.value.push({
    id: popupId,
    timeout: setTimeout(() => {
      meritPopups.value = meritPopups.value.filter(p => p.id !== popupId);
    }, 500)
  });

  // 如果Popup数量超过5，移除最旧的
  if (meritPopups.value.length > 5) {
    const oldestPopup = meritPopups.value.shift();
    clearTimeout(oldestPopup.timeout);
  }

  // 播放音效
  audioRef.value.play();

  // 触发动画
  isAnimating.value = true;
  await nextTick();
  setTimeout(() => {
    isAnimating.value = false;
  }, 300); // 与动画时间匹配
};

const resetMerit = () => {
  merit.value = 0;
  localStorage.setItem('merit', 0);
  meritPopups.value = [];
};

const autoStrike = ref(false);
let autoStrikeTimer = null;

const toggleAutoStrike = (value) => {
  if (value) {
    autoStrikeTimer = setInterval(() => {
      strikeFish();
    }, 1000); // 每秒敲一次
  } else {
    clearInterval(autoStrikeTimer);
    autoStrikeTimer = null;
  }
};

// 清理定时器
onUnmounted(() => {
  meritPopups.value.forEach(p => clearTimeout(p.timeout));
});
</script>

<template>
  <section class="widget-container muyu-box">
    <div class="muyu-text">
      <div class="muyu-gd-num">
        <p>赛博功德：{{ merit }}</p>
        <span>继续敲木鱼 摆脱烦恼</span>
      </div>
      <!-- 重置功德 -->
      <el-tooltip class="box-item" effect="dark" content="重置功德" placement="top">
        <el-button class="muyu-reset-btn" :icon="RefreshRight" @click="resetMerit" circle />
      </el-tooltip>
      <div class="muyu-text-desc">
        <!-- 自动敲击 -->
        <el-tooltip class="box-item" effect="dark" content="自动敲击木鱼" placement="top">
          <el-switch v-model="autoStrike" @change="toggleAutoStrike" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </el-tooltip>
        <p>敲电子木鱼，见机甲佛祖，修赛博真经。</p>
      </div>
    </div>
    <div class="muyu-item" @click="strikeFish">
      <!-- 音效 -->
      <audio ref="audioRef" :src="sound" preload="auto"></audio>
      <!-- 功德+1 -->
      <span v-for="popup in meritPopups" :key="popup.id" class="muyu-gd-popup">功德+1</span>
      <!-- 木鱼 -->
      <div ref="fishRef" class="muyu-y" :class="{ 'animate-muyu': isAnimating }">
        <svg t="1733481312380" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="13081">
          <path
            d="M1.45 780.397c-10.175 64.255 36.032 101.162 59.627 112.362 23.594 11.178 63.274 0 78.826 0 116.543 11.178 366.759 131.22 678.607 131.22 0 0 504.635 7.445 543.312-360.488 9.194-95.53 4.885-277.458-71.04-286.162-71.04-8.427-102.121 4.074-183.315 20.565-53.909 10.922-189.012 29.973-212.926 44.97-260.99 118.719-403.324 204.372-442.3 217.129-29.44 0-54.975-7.36-62.1-69.973 0-25.706 98.09-87.04 140.137-96.959 152.382-40.192 266.088-57.727 279.442-57.727 19.264 0 441.49-101.589 454.439-111.189 12.949-9.6 26.624-18.986 26.624-52.543 0-15.36-33.813-49.664-72.32-91.455-45.674-49.557-99.945-107.093-140.606-120.789-74.922-38.4-221.78-70.271-350.077-55.786-280.85 31.701-456.103 339.09-471.356 360.424-64.852 90.708-116.543 205.587-143.678 256.296C86.549 669.272 11.712 735.149 1.45 780.397z"
            fill="var(--el-color-warning-dark-2)" p-id="13082"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.muyu-box {
  @muyu-size: 125px;
  @muyu-transition-time: 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .muyu-text {
    width: calc(100% - 40%);
    height: 100%;

    .muyu-gd-num {
      color: var(--el-color-warning);
      padding: 10px;

      p {
        font-size: 28px;
        font-weight: bold;
        line-height: 2;
      }
    }

    .muyu-text-desc {
      position: absolute;
      bottom: 10px;
      left: 20px;
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }

    .muyu-reset-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2;
    }
  }

  .muyu-item {
    position: relative;
    width: 40%;
    height: 100%;

    .muyu-gd-popup {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform: translateX(-50%);
      color: var(--el-color-warning-dark-2);
      animation: fade-in-out 0.5s;
    }

    .muyu-y {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: @muyu-size;
      height: @muyu-size;
    }
  }

  @keyframes shake {

    0%,
    100% {
      transform: scale(1);
    }

    25% {
      transform: scale(0.9);
    }

    75% {
      transform: scale(1);
    }
  }

  @keyframes fade-in-out {
    0% {
      opacity: 0;
      transform: translateY(0);
    }

    25% {
      opacity: 0.5;
      transform: translateY(-10px);
    }

    50% {
      opacity: 0.7;
      transform: translateY(-15px);
    }

    75% {
      opacity: 1;
      transform: translateY(-20px);
    }

    100% {
      opacity: 0;
      transform: translateY(-25px);
    }
  }

  .animate-muyu {
    animation: shake @muyu-transition-time;
  }
}
</style>