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
//
import MyFriends from "./AccountView/MyFriends.vue"
import MyInfo from "./AccountView/MyInfo.vue"
import MySettings from "./AccountView/MySettings.vue"
import MyTrans from "./AccountView/MyTrans.vue"

const store = useStore()
const axios = useAxios()
onMounted(async () => {
    const req = await axios.get("/user/myaccount/")
    const resp = req.data
    if (resp.code === 200) {
        store.$patch({
            user: resp.data,
        })
    }
})
</script>
<style scoped></style>
