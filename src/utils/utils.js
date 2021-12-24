/*
 * @name: 工具库
 * @Autor: 李俊峰
 * @Date: 2021-12-20 17:31:59
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-21 14:42:33
 * @FilePath: \src\utils\utils.js
 * @Description: 工具库
 */

/**
 * 节流函数
 * @param {Function} fn 要执行的方法
 * @param {Number} wait 要节流的事件
 * @returns *
 */
export const debounce = async(fn, wait) => {
  var timer = false
  return () => {
    if (timer === false) clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}
