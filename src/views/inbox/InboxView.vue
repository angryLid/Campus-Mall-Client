<template>
    <van-action-bar class="bar">
        <van-checkbox v-model="checked" shape="square" class="checkbox"
            >全选</van-checkbox
        >

        <van-action-bar-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
        />
    </van-action-bar>
</template>

<script lang="ts" setup>
/**
 * 这个组件是购物车
 *
 */
import { Toast } from "vant"
import { ref } from "vue"
const checked = ref(false)
const onClickButton = () => Toast("点击按钮")
</script>

<style scoped>
.bar {
    position: fixed;
    bottom: 50px;
}
.checkbox {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
