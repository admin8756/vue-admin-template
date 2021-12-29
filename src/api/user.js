/*
 * @Autor: 李俊峰
 * @Version: 3.0
 * @LastEditors: 李俊峰
 */
import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/login/token',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'post',
    data: {}
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post',
    data: {}
  })
}
