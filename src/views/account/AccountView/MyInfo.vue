<template>
    <div class="avatar-group" @click="handleSign">
        <div class="avatar-group-image">
            <van-image
                :src="src"
                height="60"
                width="60"
                round
                fit="cover"
                class="image"
            >
            </van-image>
        </div>

        <div class="avatar-group-info">
            <div class="avatar-group-info-username">{{ user.name }}</div>
            <div class="avatar-group-info-userid">{{ user.id }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { computed } from "vue"
import { useRouter } from "vue-router"
import guestAvatar from "@/assets/avatar4guest.jpg"
const src = guestAvatar
const router = useRouter()
const store = useStore()

let user = computed(() => {
    return {
        name: "store.state.user.name",
        id: "store.state.user.telephone",
    }
})
function handleSign() {
    router.replace({ name: "sign" })
}
</script>

<style scoped>
.avatar-group {
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
}
.avatar-group-info {
    margin-left: 16px;
}
.image {
    border: 1px solid #9c9c9c;
}
.avatar-group-info-username {
    font-size: 20px;
    font-weight: 700;
}
.avatar-group-info-userid {
    color: #525252;
    font-size: 14px;
}
</style>
