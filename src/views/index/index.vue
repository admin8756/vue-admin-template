<!--
 * @name: 首页
 * @Autor: 李俊峰
 * @Date: 2021-12-15 18:15:33
 * @LastEditors: 李俊峰
 * @LastEditTime: 2021-12-21 14:25:38
 * @FilePath: \src\views\index\index.vue
 * @Description:首页页面
-->
<template>
  <div class="dashboard-container">
    <H1>新版系统</H1>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
