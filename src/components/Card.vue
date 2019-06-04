<template>
  <el-card>
    <div>
      <h3 class="title">{{title}}</h3>
      <div class="author">发布人: {{author}}</div>
      <div class="published">发布时间: {{published}}</div>
      <div class="course">科目: {{course}}</div>
    </div>
  </el-card>
</template>
<style lang="scss" scopoed>
</style>

<script>
export default {
  props: ["title", "author", "published", "course"]
};
</script>
