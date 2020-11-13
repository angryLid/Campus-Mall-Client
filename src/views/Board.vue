<template>
    <el-row class="tac">
        <el-col :span="6" class="full">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>职工信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">查看职位</el-menu-item>
                        <el-menu-item index="1-2">请假申请</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>管理功能</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">管理员工</el-menu-item>
                        <el-menu-item index="2-2">批准申请</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>
<style lang="scss" scoped>
.full {
    height: 100vh;
}
</style>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        getNews() {
            this.$ajax
                .get("static/data.json")
                .then(response => (this.info = response.data));
        }
    }
};
</script>
