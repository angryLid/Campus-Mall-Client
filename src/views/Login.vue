<template>
    <div class="restrict">
        <el-form @submit.prevent="submit">
            <el-form-item>
                <h1 class="title-light">职工管理系统</h1>
            </el-form-item>
            <div class="l-row">
                <el-alert
                    title="欢迎回来"
                    type="success"
                    v-show="coincided"
                    :closable="false"
                ></el-alert>
                <el-alert
                    title="账号或密码错误"
                    type="warning"
                    v-show="wrong"
                    :closable="false"
                ></el-alert>
            </div>

            <!-- 工号输入框 -->
            <el-form-item class="row">
                <el-input
                    type="text"
                    v-model="stuID"
                    placeholder="填写你的工号"
                ></el-input>
            </el-form-item>
            <!-- 密码输入框 -->
            <el-form-item class="row">
                <el-input
                    type="password"
                    v-model="psw"
                    placeholder="密码"
                ></el-input>
            </el-form-item>

            <el-form-item class="row">
                <el-checkbox>记住密码</el-checkbox>
                <el-button type="primary" @click="submit" class="rf"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
.l-row {
    padding-bottom: 16px;
}
.restrict {
    background: #fff;
    border-radius: 5px;
    box-shadow: #eee 1px 1px 1px 1px;
    margin: 200px auto 0;
    padding: 20px 40px;
    width: 36vw;
}
.rf {
    float: right;
}
.row::after {
    content: "";
    clear: both;
}
</style>
<script>
// import { test } from "../utils";
export default {
    data() {
        return {
            stuID: 10001,
            psw: "8080",
            coincided: false,
            wrong: false
        };
    },
    methods: {
        submit(event) {
            let that = this;
            this.$ajax
                .post("/login", {
                    jobNumber: this.stuID,
                    password: this.psw
                })
                .then(function(response) {
                    if (response.data.code == 200) {
                        localStorage.setItem(
                            "Authorization",
                            response.data.data
                        );
                        that.wrong = false;
                        that.coincided = true;
                        setTimeout(() => {
                            that.$router.push({ path: "/board/account" });
                        }, 500);

                        return;
                    } else {
                        that.wrong = true;
                        that.coincided = false;
                    }

                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        check(event) {
            console.log(event);
        }
    }
};
</script>
