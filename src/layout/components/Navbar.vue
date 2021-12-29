<!--
 * @name:Navbar
 * @Autor: 李俊峰
 * @Date: 2021-12-15 18:15:33
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-29 16:01:02
 * @FilePath: \src\layout\components\Navbar.vue
 * @Description:顶部工具条
-->
<template>
  <div>
    <div class="navbar">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb class="breadcrumb-container" />

      <div class="right-menu">
        <!-- 用户身份按钮 -->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper" style="display: flex">
            <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
            <el-button
              type="primary"
              :plain="true"
              style="margin-left: 10px; margin-right: 5px"
            >
              {{ $store.state.user.userName }}
            </el-button>
            <i
              class="el-icon-caret-bottom"
              style="top: 10px; font-size: 20px"
            />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 返回主页 </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              系统版本 ：{{ SYSTEM_CONFIG.version }}
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
            <!-- <router-link to="/setting"> </router-link> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { SYSTEM_CONFIG } from '@/utils/config'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      SYSTEM_CONFIG // 系统配置
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', // 路由条
      'userName', // 用户名
      'fullName' // 全称
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 1;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .user-dropdown {
    text-align: center;
    width: 300rpx;
  }
  .margin-right-leed {
    margin-right: 10px;
  }
}
</style>
