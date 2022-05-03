<template>
    <div class="avatar-group" @click="handleSign">
        <div class="avatar-group-image">
            <van-image
                v-if="store.user.name"
                :src="avatarTemplate(store.user.name.slice(0, 1))"
                height="60"
                width="60"
                round
                fit="cover"
                class="image"
            />
            <van-image
                v-else
                :src="avatarTemplate('游')"
                height="60"
                width="60"
                round
                fit="cover"
                class="image"
            />
        </div>

        <div class="avatar-group-info">
            <div class="avatar-group-info-username">
                {{ store.user.name || "游客，您好" }}
            </div>
            <div class="avatar-group-info-userid">
                {{ store.user.telephone || "点击此处登录" }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { avatarTemplate } from "@/utils/image"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()

function handleSign() {
    if (store.token === "") {
        router.push({ name: "sign" })
    }
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
