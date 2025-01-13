<script setup>
import Sidebar from '@/components/Sidebar';
import { getImageUrl } from '@/utils/public-use';
import Footer from './components/Footer.vue';
</script>

<template>
  <!-- <img class="bg-box" :src="getImageUrl('bg/bg.avif')"> -->
  <main class="container">
    <Transition name="slide-fade">
      <RouterView />
    </Transition>
  </main>
  <Sidebar />
  <Footer />
</template>

<style scoped>
main {
  position: relative;
  padding: 5px;
}

.bg-box {
  position: fixed;
  display: block;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden
}

/**/
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
