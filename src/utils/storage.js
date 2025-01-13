// storage.js

/**
 * localStorage 操作工具类
 * localStorage 只能存储字符串，所以需要将对象转换为字符串存储
 * 使用 JSON.stringify() 将对象转换为字符串
 * 使用 JSON.parse() 将字符串转换为对象
 * 使用 localStorage.setItem() 将字符串存储到 localStorage 中
 * 使用 localStorage.getItem() 从 localStorage 中获取字符串
 * 使用 localStorage.removeItem() 从 localStorage 中删除字符串
 * 使用 localStorage.clear() 清空 localStorage
 * 使用 storage.set() 将对象存储到 localStorage 中
 * 使用 storage.get() 从 localStorage 中获取对象
 * 使用 storage.remove() 从 localStorage 中删除对象
 * 使用 storage.cancel() 清空 localStorage
 */
export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  cancel() {
    localStorage.clear();
  }
};