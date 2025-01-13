<template>
  <div class="search-container">
    <div class="search-box search-bg">
      <div class="search-engine search-size" @click="toggleSearchList">
        <el-image class="search-img" :src="getEngineIcon(currentEngine)" fit="cover" loading="lazy" />
      </div>
      <input type="text" :placeholder="`${currentEngine}搜索`" class="search-input" @keydown.enter="handleSearch"
        v-model="searchQuery">
      <div class="search-button search-size" @click="handleSearch">
        <el-icon size="20px">
          <Search />
        </el-icon>
      </div>
      <transition name="search-list-fade">
        <div v-if="isSearchListVisible" class="search-list">
          <div class="s-box search-bg">
            <div v-for="engine in searchEngines" :key="engine.value" class="search-list-item"
              @click="selectEngine(engine.value)">
              <span class="s-item-icon action">
                <el-image class="s-icon" :src="engine.icon" fit="cover" loading="lazy" />
              </span>
              <p class="s-item-title">{{ engine.name }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { onMounted, onUnmounted, ref } from 'vue';

const searchEngines = [
  { name: '百度', icon: 'https://files.codelife.cc/itab/search/baidu.svg', value: 'baidu', searchUrl: 'https://www.baidu.com/s?wd=' },
  { name: '必应', icon: 'https://files.codelife.cc/itab/search/bing.svg', value: 'bing', searchUrl: 'https://www.bing.com/search?q=' },
  { name: '谷歌', icon: 'https://files.codelife.cc/itab/search/google.svg', value: 'google', searchUrl: 'https://www.google.com/search?q=' },
];

const currentEngine = ref('bing');
const searchQuery = ref('');
const isSearchListVisible = ref(false);

onMounted(() => {
  const savedEngine = localStorage.getItem('selectedEngine');
  if (savedEngine) {
    currentEngine.value = savedEngine;
  }
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

const toggleSearchList = () => {
  isSearchListVisible.value = !isSearchListVisible.value;
};

const selectEngine = (engine) => {
  currentEngine.value = engine;
  localStorage.setItem('selectedEngine', engine);
  isSearchListVisible.value = false;
};

const handleSearch = () => {
  const selectedEngine = searchEngines.find(engine => engine.value === currentEngine.value);
  if (selectedEngine && searchQuery.value) {
    const searchURL = selectedEngine.searchUrl + encodeURIComponent(searchQuery.value);
    window.open(searchURL, '_blank'); // 在新标签页中打开搜索结果
  }
};

const getEngineIcon = (engine) => {
  return searchEngines.find(e => e.value === engine)?.icon || searchEngines.find(e => e.value === 'bing').icon;
};

const handleOutsideClick = (event) => {
  const searchBox = document.querySelector('.search-box');
  if (
    event.target !== searchBox &&
    !searchBox.contains(event.target) &&
    isSearchListVisible.value
  ) {
    isSearchListVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.search-container {
  position: relative;
  z-index: 1;

  .search-bg {
    background-color: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    max-width: 400px;
    margin: 0 auto;
    border-radius: var(--rounded-full);


    .search-size {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 100%;
      border-radius: var(--rounded-full);
      overflow: hidden;

      &:hover {
        cursor: pointer;
        background-color: var(--el-mask-color-extra-light);
      }
    }

    /* 搜索图标 */
    .search-engine {
      flex-shrink: 0;

      .search-img {
        width: 25px;
        height: 25px;
        overflow: hidden;
        border-radius: 99px;
        object-fit: cover;
      }
    }

    /* 搜索输入框 */
    .search-input {
      outline: 0;
      border: none;
      width: 100%;
      height: 100%;
      padding: 0 5px;
      color: inherit;
      background-color: transparent;
      font-size: 16px;
    }

    /* 搜索按钮 */
    .search-button {
      color: var(--el-text-color-regular);
      flex-shrink: 0;
    }

    /* 搜索引擎列表 */
    .search-list {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      padding-top: 5px;
      border-radius: var(--rounded-lg);

      .s-box {
        padding: 5px;
        border-radius: var(--rounded-lg);
      }

      .search-list-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 5px 10px;
        border-radius: var(--rounded-lg);
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }
      }

      .s-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }

    /* 搜索列表的过渡效果 */
    .search-list-fade-enter-active,
    .search-list-fade-leave-active {
      transition: opacity 0.3s ease;
    }

    .search-list-fade-enter-from,
    .search-list-fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
