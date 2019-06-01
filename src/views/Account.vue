<template>
  <div class="wrapper">
    <div class="avatar">
      <div>
        <img src="../images/avatar.jpg" alt>
      </div>

      <div class="info">
        <div>
          <span class="tag ft">姓名</span> 罗伯特
        </div>
        <div>
          <span class="tag sd">学院</span> 数学与计算机学院
        </div>
        <div>
          <span class="tag td">班级</span> 18计算机科学与技术一班
        </div>
      </div>
    </div>

    <div class="content">
      <form action>
        <div class="row">
          <input type="text" id="name" placeholder="当前密码">
        </div>

        <div class="row">
          <input type="password" id="psw" placeholder="新密码">
        </div>
        <div class="row">
          <input type="password" id="psw2" placeholder="确认新密码">
        </div>
        <button>修改</button>
      </form>
    </div>
  </div>
</template>

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
  //   margin-right: 20px;
}
.tag {
  display: inline-block;
  padding: 4px;

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

  input {
    box-sizing: border-box;
    width: 60%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid #cccccc;
  }
}
button {
  width: 60%;
  height: 38px;
  font-size: 20px;
  cursor: pointer;

  border-radius: 3px;
  background-color: #307ceb;
  border: 0;
  color: white;
}
</style>
