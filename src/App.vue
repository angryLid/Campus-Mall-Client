<template>
  <div class="panel">
    <div class="nav">
      <router-link class="link" to="/" exact v-show="!$store.state.checkedIn">登录</router-link>
      <router-link class="link" to="register" v-show="!$store.state.checkedIn">注册</router-link>
      <router-link class="link" to="cources" v-show="$store.state.checkedIn">选课</router-link>
      <router-link class="link" to="apply" v-show="$store.state.checkedIn">请假</router-link>
      <router-link class="link" to="library" v-show="$store.state.checkedIn">借阅管理</router-link>
      <router-link class="link" to="score" v-show="$store.state.checkedIn">成绩查询</router-link>
      <router-link class="link" to="feedback" v-show="$store.state.checkedIn">评价调查</router-link>
      <router-link class="link" to="account" v-show="$store.state.checkedIn">账户管理</router-link>
    </div>

    <div class="view">
      <!-- <transition name="fade"> -->
      <router-view class="app-root"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
require("normalize.css");
require("./css/global.scss");
// import "./css/base.css";
export default {};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  justify-content: space-between;
  // vertical & horizontal center
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  height: 86vh;
  width: 80vw;
}
.nav {
  width: 18%;
  border-radius: 8px;
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px -1px 1px 1px rgba(0, 0, 0, 0.1); */
}
.view {
  width: 80%;
}
.link {
  display: block;

  margin: 5px;
  padding: 8px 26px 8px 0;
  border-radius: 6px;
  color: #3490de;
  text-decoration: none;
  text-align: right;
  font-size: 20px;

  :hover {
    color: #2283d4;
  }
  &.active {
    color: white;
    background: #3490de;
  }
}
</style>
