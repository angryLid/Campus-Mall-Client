<template>
  <div class="wrapper-w80">
    <card
      class="card"
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :author="card.author"
      :course="card.course"
      :published="card.published"
    ></card>
  </div>
</template>

<style>
.card {
  margin-bottom: 20px;
}
</style>

<script>
import card from "../components/Card.vue";
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  components: {
    card
  },

  data() {
    return {
      title: "fd",
      cards: [
        {
          id: 1,
          title: "期末问卷调查",
          author: "刘开口",
          published: "2019/06/05",
          course: "高等数学下"
        },
        {
          id: 2,
          title: "教学水平评价",
          author: "张三",
          published: "2019/06/04",
          course: "大学体育"
        }
      ]
    };
  }
};
</script>