import request from "@/utils/request";

/* --------------------插件的API接口-------------------- */
/**
 * 获取古诗词一言
 */
export const getShici = () => {
  return request({
    url: import.meta.env.VITE_SHICI_API,
    method: 'get'
  })
}

/**
 * 获取历史的今日
 */
export const getHistory = () => {
  return request({
    url: import.meta.env.VITE_HISTORY_API,
    method: 'get'
  })
}