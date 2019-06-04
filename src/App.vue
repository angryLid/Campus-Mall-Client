<template>
  <div class="panel">
    <div class="nav" v-if="desktop">
      <router-link class="link" to="/" exact>登录</router-link>
      <router-link class="link" to="register">注册</router-link>
      <router-link class="link" to="board">公告栏</router-link>
      <router-link class="link" to="cources">选课</router-link>
      <router-link class="link" to="apply">请假</router-link>
      <router-link class="link" to="library">借阅管理</router-link>
      <router-link class="link" to="score">成绩查询</router-link>
      <router-link class="link" to="feedback">评价</router-link>
      <router-link class="link" to="account">账户管理</router-link>
    </div>

    <div class="view">
      <router-view class="app-root"></router-view>
    </div>
  </div>
</template>

<script>
require("normalize.css");
require("./css/global.scss");
require("./css/root.scss");
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      desktop: true,
      menu: {
        content: "折叠菜单"
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    collapse(e) {
      this.desktop = this.desktop ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
