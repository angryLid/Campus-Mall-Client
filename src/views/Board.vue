<template>
  <div class="wrapper-w80">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in news" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: white;
  font-size: 24px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #9bb9c2;
}
</style>
<script>
export default {
  data() {
    return {
      news: [
        "热烈欢迎巡视组来我校视察",
        "庆祝第二十六届校田径运动会圆满结束",
        "警惕传销, 校园贷",
        "祝贺本校排球队获全国锦标赛亚军"
      ]
    };
  }
};
</script>
