<template>
  <div class="wrapper-w40">
    <el-form action>
      <el-form-item>
        <h1 class="title-light">教学服务平台</h1>
      </el-form-item>
      <el-form-item class="row">
        <el-input type="text" v-model="stuid" placeholder="学号/电话号码/邮箱"></el-input>
      </el-form-item>

      <el-form-item class="row">
        <el-input type="password" v-model="psw" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="row">
        <el-checkbox>记住密码</el-checkbox>
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  data() {
    return {
      stuid: "1802211021",
      psw: "123"
    };
  }
};
</script>
