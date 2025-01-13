<script setup>
import Clock from './widgets/Clock';
import Hello from './widgets/Hello.vue';
import HistoryToday from './widgets/HistoryToday';
import MuYu from './widgets/MuYu';
import ShiCi from './widgets/ShiCi';
import Calendar from './widgets/XCalendar';
</script>

<template>
  <div class="home-box">
    <el-row :gutter="20">
      <el-col :md="24" :lg="24">
        <Hello />
      </el-col>
      <el-col :md="12" :lg="8">
        <Clock />
      </el-col>
      <el-col :md="12" :lg="8">
        <ShiCi />
      </el-col>
      <el-col :md="12" :lg="8">
        <Calendar />
      </el-col>
      <el-col :md="12" :lg="8">
        <HistoryToday />
      </el-col>
      <el-col :md="12" :lg="8">
        <MuYu />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.home-box {
  padding-top: 20px;
}

.widget-container {
  position: relative;
  padding: 10px;
  height: 220px;
  background-color: #fff;
  border-radius: var(--rounded-lg);
  box-shadow: var(--el-box-shadow-lighter);
  transition: all 0.3s ease;
  margin-bottom: 10px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--el-box-shadow-light);
  }
}
</style>
