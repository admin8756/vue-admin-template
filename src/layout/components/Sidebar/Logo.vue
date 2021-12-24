<!--
 * @name: 图标
 * @Autor: 李俊峰
 * @Date: 2021-12-15 18:15:33
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-21 14:27:10
 * @FilePath: \src\layout\components\Sidebar\Logo.vue
 * @Description: 侧边栏图标
-->

<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
        >
        <!-- <h1 v-else class="sidebar-title">{{ title }}</h1> -->
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logoWhite"
          class="sidebar-logo-white"
        >
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
import { SYSTEM_CONFIG } from '@/utils/config'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: SYSTEM_CONFIG.title,
      logoWhite: SYSTEM_CONFIG.logoWhite,
      logo: SYSTEM_CONFIG.logo
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-logo-white {
      width: 88%;
      height: 50px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
