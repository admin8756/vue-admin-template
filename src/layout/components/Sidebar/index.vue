<!--
 * @Autor: 李俊峰
 * @Version: 3.0
 * @LastEditors: 李俊峰
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      @mouseenter.native="mouseMovementEvent(true)"
      @mouseleave.native="mouseMovementEvent(false)"
    >
      <el-menu
        style="padding-bottom: 120px"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in routes"
          :key="index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { debounce } from '@/utils/utils'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  methods: {
    /* 鼠标移动 */
    async mouseMovementEvent(type) {
      debounce(this.setType(type), 1000)
    },
    setType(type) {
      this.sidebar.opened = type
    }
  }
}
</script>
