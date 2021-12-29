/*
 * @name: 用户信息
 * @Autor: 李俊峰
 * @Date: 2021-12-15 18:15:33
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-29 15:45:51
 * @FilePath: \src\store\modules\user.js
 * @Description: 用户信息状态管理器
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userType: '',
    routerList: [],
    userAuthorizationDate: '',
    userdeadLineDate: ''

  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, e) => {
    state.userName = e
  },
  SET_FULLNAME: (state, e) => {
    state.fullName = e
  },
  SET_USER_TYPE: (state, e) => {
    state.userType = e
  },
  SET_ROUTER_LIST: (state, e) => {
    state.routerList = e
  },
  SET_USER_AUTHORIZATION_DATE: (state, e) => {
    state.userAuthorizationDate = e
  },
  SET_USERDEAD_LINE_DATE: (state, e) => {
    state.userdeadLineDate = e
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), loginPwd: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.user_token)
        setToken(data.user_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          return reject('验证失败，请稍后重试')
        }
        const {
          fullName,
          userName,
          userType,
          crtTime,
          deadLine
        } = data
        commit('SET_ROUTER_LIST', response.other.list)
        commit('SET_FULLNAME', fullName)
        commit('SET_NAME', userName)
        commit('SET_USER_TYPE', Number(userType))
        commit('SET_USER_AUTHORIZATION_DATE', crtTime)
        commit('SET_USERDEAD_LINE_DATE', deadLine)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

