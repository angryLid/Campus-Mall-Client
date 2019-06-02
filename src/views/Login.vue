<template>
  <div class="wrapper-w40">
    <el-form @submit.prevent="submit">
      <el-form-item>
        <h1 class="title-light">教学服务平台</h1>
      </el-form-item>
      <div class="l-row">
        <el-alert title="欢迎回来" type="success" v-show="coincided" :closable="false"></el-alert>
        <el-alert title="账号或密码错误" type="warning" v-show="wrong" :closable="false"></el-alert>
      </div>

      <el-form-item class="row">
        <el-input type="text" v-model="stuID" placeholder="学号/电话号码/邮箱"></el-input>
      </el-form-item>

      <el-form-item class="row">
        <el-input type="password" v-model="psw" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="row">
        <el-checkbox>记住密码</el-checkbox>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
      <p>look at here {{ $store.state.checkedIn }}</p>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.l-row {
  padding-bottom: 16px;
}
</style>
<script>
// import { test } from "../utils";
export default {
  data() {
    return {
      stuID: "1802211021",
      psw: "123",
      coincided: false,
      wrong: false
    };
  },
  methods: {
    submit(event) {
      console.log(event);
      if (this.stuID == "1802211021" && this.psw == "123") {
        this.wrong = false;
        this.coincided = true;
        this.$store.commit("success");
        // test();
        this.$router.push({ path: "/account" });
        console.log("checkedIn");
      } else {
        this.wrong = true;
        console.log("failed");
      }
    },
    check(event) {
      console.log(event);
    }
  }
};
</script>
