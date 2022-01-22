<template>
    <my-info />
    <my-friends />
    <my-trans />
    <my-settings />
</template>
<script lang="ts" setup>
import { useAxios } from "@/utils/ajax"
import { onMounted } from "vue"
import { useStore } from "../../store"
import docCookies from "../../utils/cookies"
//
import MyFriends from "./AccountView/MyFriends.vue"
import MyInfo from "./AccountView/MyInfo.vue"
import MySettings from "./AccountView/MySettings.vue"
import MyTrans from "./AccountView/MyTrans.vue"

const store = useStore()
const axios = useAxios()
onMounted(() => {
    const jwt = docCookies.getItem("auth")
    if (jwt) {
        axios
            .get("/user/myaccount/", {
                headers: { auth: jwt },
            })
            .then((res) => console.log)
    }
})
</script>
<style scoped></style>
