<template>
  <div
    class="login-container"
    :style="'background:url(' + require('@/assets/login_bg.jpg') + ');'"
  >
    <div class="starsView">
      <!-- 动态星星背景 -->
      <div class="stars">
        <div
          v-for="(item, index) in starsCount"
          :key="index"
          ref="star"
          class="star"
        />
      </div>
      <!-- 登录框 -->
      <div class="logingview">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">领云电力交易平台</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-checkbox v-model="agreeToSignIn">
            <span
              class="flex margin-top"
              style="font-size: 12px; color: #ccc; justify-content: flex-start"
            >用户已阅读并同意:
              <el-link
                style="font-size: 12px"
                type="primary"
                class="text-bold"
                @click="showUserSever"
              >《领云电力交易平台用户服务协议》</el-link></span>
          </el-checkbox>

          <!-- <el-button
            type="info"
            style="
              width: 100%;
              margin: 0;
              margin-top: 15px;
              margin-bottom: 30px;
            "
            @click="handleFullScreen"
          >
            {{ isFullscreen ? '退出全屏' : '进入全屏' }}
          </el-button> -->
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-top: 30px; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
          >
            立即登录
          </el-button>

          <div class="tips">
            <span> 系统版本：{{ version }}</span>
          </div>
        </el-form>
      </div>
      <!-- logo -->
      <div class="logoView">
        <img :src="logoSrc" class="logo" alt="江苏领云能源科技有限公司">
        <!-- <div class="title">{{ logoTitle }}</div> -->
      </div>
      <!-- 版权信息 -->
      <div class="copyrightView">
        <span>版权所有 © 2021 江苏领云能源科技有限公司 ·
          苏ICP备2020070464号-1</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { SYSTEM_CONFIG } from '@/utils/config'
import screenfull from 'screenfull'
// import { MessageBox } from 'element-ui'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      agreeToSignIn: false,
      starsCount: 800,
      distance: 800,
      logoSrc: SYSTEM_CONFIG.logoWhite,
      version: SYSTEM_CONFIG.version,
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      isFullscreen: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
    const starArr = this.$refs.star
    starArr.forEach((item) => {
      const speed = 0.2 + Math.random() * 1
      const thisDistance = this.distance + Math.random() * 300
      item.style.transformOrigin = `0 0 ${thisDistance}px`
      item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${
        Math.random() * 360
      }deg) rotateX(${Math.random() * -50}deg) scale(${speed}, ${speed})`
    })
  },
  methods: {
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
input:-internal-autofill-selected {
  -webkit-text-fill-color: #666666 !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  overflow: hidden;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  .starsView {
    overflow: hidden;
    position: relative;
    height: 100vh;
    width: 100vw;
    .stars {
      transform: perspective(500px);
      transform-style: preserve-3d;
      position: absolute;
      perspective-origin: 50% 100%;
      left: 50%;
      animation: rotate 90s infinite linear;
      bottom: 0;
      .star {
        width: 2px;
        height: 2px;
        background: #eeeeee;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
      }
    }
  }
  .logingview {
    position: absolute;
    width: 400px;
    top: 6rem;
    right: 10rem;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          // box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  .logoView {
    position: absolute;
    top: 4rem;
    left: 4rem;
    width: 100%;
    color: $light_gray;
    display: flex;
    .logo {
      height: 80px;
    }
  }
  .copyrightView {
    position: absolute;
    bottom: 4rem;
    width: 100%;
    text-align: center;
    color: $light_gray;
  }
}
$bg: #25303d;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 30px;
    margin: 0 auto;
    margin-top: 160px;
    transform-origin: 161px 100%;
    transform: rotateX(0deg);
    transition-property: transform, opacity, box-shadow, top, left;
    overflow: hidden;
    background-image: linear-gradient(230deg, #35394a00 0%, #000000 150%);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    text-align: right;
    span {
      text-align: center;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
