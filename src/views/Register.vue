<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item>
        <h1 class="title-light">新生注册</h1>
      </el-form-item>
      <el-form-item label>
        <el-col :span="6">
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-col>
        <el-col :span="17" :offset="1">
          <el-input v-model="form.key" placeholder="注册码"></el-input>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label></el-form-item> -->
      <el-form-item label>
        <el-input v-model="form.tel" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-input type="password" v-model="form.psw" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-input type="password" v-model="form.psw2" placeholder="重复密码"></el-input>
      </el-form-item>
      <el-form-item class="row">
        <el-button type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}

a {
  text-decoration: none;
  font-size: 12px;
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        key: "",
        tel: "",
        psw: "",
        psw: ""
      }
    };
  }
};
</script>
