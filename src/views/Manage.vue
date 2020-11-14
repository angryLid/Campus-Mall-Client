<template>
    <div class="wrapper-w80">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="uid"
                label="工号"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="uname"
                label="姓名"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="usex"
                label="性别"
                width="80"
            ></el-table-column>
            <el-table-column
                prop="dateEntry"
                label="入职时间"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="department"
                label="部门"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="position"
                label="职位"
                width="200"
            ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-link
                        type="success"
                        @click="select(scope.$index, scope.row)"
                        :disabled="disabled(scope.$index, scope.row)"
                        >管理</el-link
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
    data() {
        return {
            search: "",
            tableData: [],
            chosenCources: []
        };
    },
    methods: {
        disabled(index, row) {
            return row.selected;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },

        handleDelete(index, row) {
            console.log(index, row);
        },

        select(index, row) {
            console.log(row);
            // row.selected = true;
            let crs = this.tableData[index];

            if (crs.selected) {
                return;
            } else {
                crs.selected = true;
                this.chosenCources.push(crs);
            }
        },

        cancel(index, row) {
            this.tableData[row.id].selected = false;
            console.log(row.id);
            this.chosenCources.splice(index, 1);
        }
    },
    created: function() {
        let that = this;
        let token = localStorage.getItem("Authorization");
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: token
            }
        };
        this.$ajax
            .get("/profile/all", axiosConfig)
            .then(res => {
                if (res.data.code == 200) {
                    that.tableData = res.data.data;
                    that.tableData.map(item => {
                        item.usex = item.usex == "M" ? "男" : "女";
                    });
                } else {
                    // this.handleLogout();
                }
            })
            .catch(err => {});
    }
};
</script>
