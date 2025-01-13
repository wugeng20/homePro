// /router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Index'),
    meta: { title: '首页' }
  },
  {
    path: '/website',
    name: 'website',
    component: () => import('@/views/Website/Index'),
    meta: { title: '导航网站' }
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/Game/Index'),
    meta: { title: '我的游戏' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About/Index'),
    meta: { title: '关于' }
  },
  // 建议添加一个404页面路由
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配的路径
    name: 'not-found',
    component: () => import('@/views/NotFound/Index'),
    meta: { title: '404 - 页面未找到' }
  }
];

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局后置钩子，改变页面标题
router.afterEach((to) => {
  const siteName = import.meta.env.VITE_SITE_NAME;
  const siteDes = import.meta.env.VITE_SITE_DES;

  // 默认标题格式
  let title = to.meta.title ? `${to.meta.title} - ${siteName}` : `${siteName} - ${siteDes}`;

  // 如果页面是首页，则使用特定的标题格式
  if (to.meta.title === "首页") {
    title = `${siteName} - ${siteDes}`;
  }

  document.title = title;
});

export default router;