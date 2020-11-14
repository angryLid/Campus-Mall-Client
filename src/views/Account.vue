<template>
    <div class="wrapper">
        <div class="avatar">
            <div>
                <img src="../images/avatar.jpg" alt />
            </div>

            <div class="info">
                <div><span class="tag ft">工号</span>{{ this.person.uid }}</div>
                <div>
                    <span class="tag sd">姓名</span>{{ this.person.uname }}
                </div>
                <div>
                    <span class="tag sd">性别</span>{{ this.person.usex }}
                </div>
                <div>
                    <span class="tag td">部门</span>{{ this.person.department }}
                </div>
                <div>
                    <span class="tag td">职位</span> {{ this.person.position }}
                </div>
                <div>
                    <span class="tag td">入职时间</span>
                    {{ this.person.dateEntry }}
                </div>
                <div>
                    <span class="tag td">管理员权限</span>
                    {{ this.person.isAdmin }}
                </div>
            </div>
        </div>

        <el-button type="danger" @click="handleLogout">退出登录</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            person: {
                uid: 0,
                uname: "null",
                usex: "男",
                dateEntry: "null",
                department: "Null",
                position: "null",
                isAdmin: 0
            }
        };
    },
    methods: {
        handleLogout() {
            localStorage.removeItem("Authorization");
            this.$router.push({
                path: "/"
            });
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
            .get("/profile", axiosConfig)
            .then(res => {
                if (res.data.code == 200) {
                    that.person = res.data.data;
                    that.person.usex = that.person.usex == "M" ? "男" : "女";
                    that.person.isAdmin =
                        that.person.isAdmin == 1 ? "管理员" : "普通职工";
                    if (that.person.isAdmin == 1) {
                        this.$store.state.commit("permit");
                    }
                } else {
                    this.handleLogout();
                }
            })
            .catch(err => {});
    }
};
</script>
<style lang="scss" scoped>
.wrapper {
    width: 65%;
    margin: 0 auto;
}
.avatar {
    display: flex;
    img {
        width: 100px;
        border: 2px rgba(0, 0, 0, 0.15) solid;
    }
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 30px;
    div {
        padding: 5px 0;
    }
    //   margin-right: 20px;
}
.tag {
    display: inline-block;
    padding: 4px;
    margin-right: 20px;
    font-weight: 300;
    color: white;
    border-radius: 3px;
}
.ft {
    background: #f44336;
}
.sd {
    background: #009688;
}
.td {
    background: #2196f3;
}
.content {
    padding-top: 30px;
}
.row {
    padding: 5px 0 20px 0;
    height: 32px;

    /* input {
    box-sizing: border-box;
    width: 60%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid #cccccc;
  } */
}
/* button {
  width: 60%;
  height: 38px;
  font-size: 20px;
  cursor: pointer;

  border-radius: 3px;
  background-color: #307ceb;
  border: 0;
  color: white;
} */
</style>
