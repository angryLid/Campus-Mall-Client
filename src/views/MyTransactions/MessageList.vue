<template>
    <my-navbar title="消息列表" route-name="account" />
    <template v-for="item in list" :key="item.telephone">
        <van-cell
            :title="item.name"
            :value="formatTime(item.createdAt)"
            :label="item.content"
            @click="() => goForward(item.telephone)"
        />
    </template>
</template>

<script lang="ts" setup>
import { ChatNotification, getMessageList } from "@/api/message"
import { onMounted, Ref, ref } from "vue"
import MyNavbar from "@/components/MyNavbar.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const list: Ref<ChatNotification[]> = ref([])

onMounted(async () => {
    const req = await getMessageList()
    const resp = req.data
    if (resp.code === 200 && resp.data) {
        list.value = resp.data.sort(
            (a: ChatNotification, b: ChatNotification) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
            }
        )
    }

    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
})

function formatTime(time: string) {
    return `${time.slice(5, 7)}/${time.slice(8, 10)} ${time.slice(11, 16)}`
}

function goForward(telephone: string) {
    console.log("%c [heer]:", "color:white;background:red;font-size:13px")
    router.push({
        name: "chat",
        params: {
            id: telephone,
        },
    })
}
</script>

<style scoped></style>
