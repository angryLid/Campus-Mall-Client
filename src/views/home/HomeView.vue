<template>
    <div>
        <van-search v-model="toBeSearched" placeholder="请输入搜索关键词" />
    </div>
    <van-tabs v-model:active="active">
        <van-tab title="个人闲置"><person-trade></person-trade></van-tab>
        <van-tab title="校园商家">内容 2</van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import { useAxios } from "@/utils/ajax"
import { computed, onMounted, ref } from "vue"
import { useStore } from "../../store"
import docCookies from "../../utils/cookies"
import PersonTrade from "./PersonTrade.vue"
const axios = useAxios()
const active = ref(0)
const store = useStore()
const toBeSearched = computed(() => "")

onMounted(() => {
    const jwt = docCookies.getItem("auth")
    if (jwt) {
        axios.get("/user/?token=" + jwt).then((res) => {
            if (!res.data) {
                docCookies.removeItem("auth", null, null)
            } else {
                axios
                    .get("/user/myaccount/", {
                        headers: { Authorization: jwt },
                    })
                    .then((res) => console.log)
            }
        })
    }
})
</script>

<style lang="scss" scoped></style>
