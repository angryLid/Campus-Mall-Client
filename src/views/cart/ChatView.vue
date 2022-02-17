<template>
    <div id="chat-page" class="chat-container">
        <div class="chat-header">
            <div class="chat-header-btn" @click="goBack">
                <van-icon name="arrow-left" />
            </div>
            <div class="chat-header-title">{{ opponentName }}</div>
            <div class="chat-header-btn hidden" @click="goBack">
                <van-icon name="arrow-left" />
            </div>
        </div>
        <ul class="messageArea">
            <li
                class="messageArea-item"
                v-for="(m, i) in messages"
                :key="i"
                :class="{
                    self: m.senderTel === myself,
                    opponent: m.senderTel !== myself,
                }"
            >
                {{ m.content }}
            </li>
        </ul>
        <form class="form-group">
            <input
                v-model="message"
                type="text"
                id="message"
                placeholder="消息"
                autocomplete="off"
                class="form-control"
            />
            <button type="submit" class="primary" @click.prevent="send">
                发送
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue"
import type { Ref } from "vue"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import type { CompatClient, IMessage } from "@stomp/stompjs"
import { useStore } from "@/store"
import { useRoute } from "vue-router"
import { getNameByTel } from "@/api/user"
import router from "@/router"
import { Toast } from "vant"

interface ChatMessage {
    content: string
    senderTel: string
    recipientTel: string
}

let stompClient: CompatClient
const store = useStore()
const route = useRoute()

const message = ref("")
const myself: Ref<string> = computed(() => store.user.telephone)
const opponent = computed(() =>
    typeof route.params.id === "string" ? route.params.id : ""
)

const opponentName: Ref<string> = ref("")
const messages: Ref<ChatMessage[]> = ref([])

onMounted(() => {
    onRegister()

    if (typeof opponent.value === "string") {
        getNameByTel(opponent.value).then((resp) => {
            if (resp.data.code === 200) {
                opponentName.value = resp.data.data
            }
        })
    }
})

function onRegister() {
    stompClient = Stomp.over(
        () => new SockJS("http://localhost:8080/websocket")
    )
    stompClient.connect({}, onConnected, onError)
}

function onConnected() {
    const subscription = store.user.telephone
    const body: ChatMessage = {
        senderTel: store.user.telephone,
        recipientTel: opponent.value,
        content: "",
    }
    stompClient.subscribe(
        `/user/${subscription}/queue/messages`,
        onMessageReceived
    )
    stompClient.publish({
        destination: `/app/history`,
        body: JSON.stringify(body),
    })
}
function onError() {
    Toast("网络连接出了一些问题")
}
function onMessageReceived(payload: IMessage) {
    const message: ChatMessage | ChatMessage[] = JSON.parse(payload.body)
    console.log(
        "%c [payload]:",
        "color:white;background:blue;font-size:13px",
        message
    )

    if (Array.isArray(message)) {
        messages.value = message
    } else {
        messages.value.push(message)
    }

    // messages.value.push(JSON.parse(payload.body))
}

function send() {
    if (message.value && stompClient) {
        try {
            const body: ChatMessage = {
                senderTel: myself.value,
                recipientTel: opponent.value,
                content: message.value,
            }
            stompClient.publish({
                destination: "/app/chat",
                body: JSON.stringify(body),
            })
            messages.value.push(body)
            message.value = ""
        } catch (e) {
            console.log(e)
        }
    }
}

function goBack() {
    router.back()
}
</script>

<style scoped>
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

button {
    box-shadow: none;
    border: 1px solid transparent;
    font-size: 14px;
    outline: none;
    line-height: 100%;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    min-height: 38px;
    background-color: #25be38;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}

.chat-header {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #ececec;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-header-btn {
    /* border: 1px gray dotted; */
    /* border-radius: 30px; */
}
.chat-header-title {
    text-align: center;
    margin: 0;
}
.hidden {
    visibility: hidden;
}
.self {
    background: rgb(238, 255, 222);
    color: #444;
    text-align: right;
    overflow: visible;

    margin-left: 30px;
    margin-right: 5px;
    margin-top: 5px;
}
.opponent {
    background: whitesmoke;
    text-align: left;
    margin-left: 5px;
    margin-top: 5px;
    margin-right: 30px;
}
.messageArea-item {
    padding: 5px;
    border-radius: 10px;
    display: block;
    overflow-wrap: break-word;

    line-height: 1.5rem;
    margin-bottom: 5px;
    border-bottom: 1px solid #f4f4f4;
}

.form-control {
    width: 100%;
    min-height: 38px;
    font-size: 15px;
    padding-left: 10px;
    outline: none;
    border: 1px solid #c8c8c8;
}

.form-group {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
}

.chat-container {
    height: 100vh;
    width: 100vw;
    background-color: #fdfdfd;
    position: relative;
}

.messageArea {
    list-style-type: none;
    background-color: #fdfdfd;
    padding-bottom: 30px;
    max-height: 600px;
    overflow: scroll;
}
</style>
