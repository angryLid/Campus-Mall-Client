<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            router
            @select="handleSelect"
        >
            <el-menu-item index="account">职工信息</el-menu-item>
            <el-menu-item index="apply">提交申请</el-menu-item>
            <el-submenu index="3">
                <template slot="title"
                    >管理</template
                >
                <el-menu-item index="3-1">管理员工</el-menu-item>
                <el-menu-item index="3-2">申请审批</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view> </router-view>
    </div>
</template>

<style lang="scss" scoped>
.el-menu-demo {
    margin-bottom: 75px;
}
</style>

<script>
export default {
    data() {
        return {
            activeIndex: "1"
        };
    },
    methods: {
        toAccount() {
            this.$router.push("/account");
        },
        handleSelect() {}
    }
};
</script>
