<template>
    <my-info />
    <my-friends />
    <my-trans />
    <my-settings />
</template>
<script lang="ts" setup>
import { onMounted } from "vue"
import { useStore } from "../../store"
import ajax from "../../utils/ajax"
import docCookies from "../../utils/cookies"
//
import MyFriends from "./AccountView/MyFriends.vue"
import MyInfo from "./AccountView/MyInfo.vue"
import MySettings from "./AccountView/MySettings.vue"
import MyTrans from "./AccountView/MyTrans.vue"

const store = useStore()

onMounted(() => {
    const jwt = docCookies.getItem("auth")
    if (jwt) {
        ajax.get("/user/myaccount/", {
            headers: { Authorization: jwt },
        }).then((res) => (store.state.user = res.data.data))
    }
})
</script>
<style scoped></style>
