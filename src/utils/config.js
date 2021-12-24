/*
 * @name: 系统参数配置
 * @Autor: 李俊峰
 * @Date: 2021-03-17 13:49:12
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-21 13:25:38
 * @FilePath: \src\utils\config.js
 * @Description: file content
 */

export const TIME_STYLE = 'yyyy-MM-dd hh:mm:ss'
export const TIME_STYLE_SYSTEM = 'MM月dd日 hh:mm:ss-S'
/**
 * 全局配置刷新时间（单位秒）
 * CA ca的连接检测 14分钟34秒
 * list 已成交和委托中的刷新时间
 */

export const REFRESH_TIME = {
  CA: 874,
  CFCA: 874,
  list: 87560,
  adminTrading: 30
}

/**
 * 项目基础配置
 */
export const SYSTEM_CONFIG = {
  title: '领云·能源科技',
  logo: require('@/assets/logo.png'),
  logoWhite: require('@/assets/logo-white.png'),
  version: 'V3.1.8.1220'
}

/**
 *  交易页面分页配置
 */
export const PAGINATION_CLASS = {
  classF: {
    pageSize: 5,
    background: true
  },
  classH: {
    pageSize: 10,
    background: true
  }
}

/**
 * 项目颜色配置
 */
export const COLOR_LIST = {
  upColor: '#F56C6C',
  downColor: '#4caa90',
  lineColor1: '#e9896a',
  lineColor2: '#a685e2'
}

/**
 *  这里配置了页面所有的单位和价格字段
 */
export const UNIT_DEFINE = {
  specs: 'MWh',
  prices: '元/MWh',
  specsPlus: '(MWh)',
  pricesPlus: '(元/MWh)',
  billionDegrees: '亿度'
}
