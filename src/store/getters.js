/*
 * @name: 状态管理器
 * @Autor: 李俊峰
 * @Date: 2021-12-15 18:15:33
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-29 15:45:53
 * @FilePath: \src\store\getters.js
 * @Description: 状态管理器
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userName: state => state.user.userName,
  fullName: state => state.user.fullName,
  userType: state => state.user.userType,
  routerList: state => state.user.routerList,
  userdeadLineDate: state => state.user.userdeadLineDate,
  userAuthorizationDate: state => state.user.userAuthorizationDate
}
export default getters
