<template>
  <div>
    <Calendar v-on:choseDay="clickDay" :agoDayHide="getTimestamp()"></Calendar>
    <input v-model="chosen" type="text" disabled>
    <select name id>
      <option>第一课时</option>
      <option>第二课时</option>
      <option>第三课时</option>
      <option>第四课时</option>
      <option>第五课时</option>
      <option>第六课时</option>
      <option>第七课时</option>
      <option>第八课时</option>
    </select>
    <button></button>
    <textarea name id cols="30" rows="10"></textarea>
    <input type="text" @input="changed">
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import Calendar from "vue-calendar-component";
export default {
  components: {
    Calendar
  },
  methods: {
    clickDay(data) {
      this.chosen = data;
    },
    getTimestamp() {
      let timeStamp = Date.parse(new Date()) / 1000;
      return timeStamp + "";
    },
    changed(event){
      this.$store.commit('change',event.target.value)
    }
  },
  data() {
    return {
      chosen: null
    };
  }
};
</script>
