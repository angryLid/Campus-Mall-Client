<template>
    <div id="username-page">
        <div class="username-page-container">
            <h1 class="title">Digite seu nome</h1>
            <form id="usernameForm" name="usernameForm">
                <div class="form-group">
                    <input
                        v-model="username"
                        type="text"
                        id="name"
                        placeholder="Nome"
                        autocomplete="off"
                        class="form-control"
                    />
                </div>
                <div class="form-group">
                    <button
                        type="submit"
                        class="accent username-submit"
                        @click="onRegister"
                    >
                        Comece a conversar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div id="chat-page" class="">
        <div class="chat-container">
            <div class="chat-header">
                <h2>ChatBox Tupi</h2>
            </div>
            <!-- <div class="connecting">Conectando ao chat...</div> -->
            <ul id="messageArea">
                <li v-for="(m, i) in messages" :key="i">
                    {{ m }}
                </li>
            </ul>
            <form id="messageForm" name="messageForm" nameForm="messageForm">
                <div class="form-group">
                    <div class="input-group clearfix">
                        <input
                            v-model="message"
                            type="text"
                            id="message"
                            placeholder="Digite uma mensagem..."
                            autocomplete="off"
                            class="form-control"
                        />
                        <button type="submit" class="primary" @click="send">
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import type { Ref } from "vue"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import type { CompatClient, IMessage } from "@stomp/stompjs"

let stompClient: CompatClient
const username = ref("")
const message = ref("")

const messages: Ref<IMessage[]> = ref([])
function onRegister() {
    stompClient = Stomp.over(
        () => new SockJS("http://localhost:8080/websocket")
    )
    stompClient.connect({}, onConnected, onError)
}

function onConnected() {
    stompClient.subscribe("/topic/public", onMessageReceived)
    stompClient.publish({
        destination: "/app/chat.register",
        body: JSON.stringify({ sender: username.value, type: "JOIN" }),
    })
}
function onError() {
    console.log("%c [error]:", "color:white;background:red;font-size:13px")
}
function onMessageReceived(payload: IMessage) {
    messages.value.push(JSON.parse(payload.body))
}

function send() {
    if (message.value && stompClient) {
        stompClient.publish({
            destination: "/app/chat.send",
            body: JSON.stringify({
                sender: username.value,
                content: message.value,
                type: "CHAT",
            }),
        })

        message.value = ""
    }
}
</script>

<style scoped>
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.clearfix:after {
    display: block;
    content: "";
    clear: both;
}

.hidden {
    display: none;
}

.form-control {
    width: 100%;
    min-height: 38px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
}

.form-group {
    margin-bottom: 15px;
}

input {
    padding-left: 10px;
    outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 20px;
    margin-bottom: 20px;
}

h1 {
    font-size: 1.7em;
}

a {
    color: #128ff2;
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
}

button.default {
    background-color: #e8e8e8;
    color: #333;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
}

button.primary {
    background-color: #25be38;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}

button.accent {
    background-color: #1778dd;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}

#username-page {
    text-align: center;
}

.username-page-container {
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 2px;
    width: 100%;
    max-width: 500px;
    display: inline-block;
    margin-top: 42px;
    vertical-align: middle;
    position: relative;
    padding: 35px 55px 35px;
    min-height: 250px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: -160px;
}

.username-page-container .username-submit {
    margin-top: 10px;
}

#chat-page {
    position: relative;
    height: 100%;
}

.chat-container {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    margin-top: 30px;
    height: calc(100% - 60px);
    max-height: 600px;
    position: relative;
}

#chat-page ul {
    list-style-type: none;
    background-color: #fff;
    margin: 0;
    overflow: auto;
    overflow-y: scroll;
    padding: 0 20px 0px 20px;
    height: calc(100% - 150px);
}

#chat-page #messageForm {
    padding: 20px;
}

#chat-page ul li {
    line-height: 1.5rem;
    padding: 10px 20px;
    margin: 0;
    border-bottom: 1px solid #f4f4f4;
}

#chat-page ul li p {
    margin: 0;
}

#chat-page .event-message {
    width: 100%;
    text-align: center;
    clear: both;
}

#chat-page .event-message p {
    color: #777;
    font-size: 14px;
    word-wrap: break-word;
}

#chat-page .chat-message {
    padding-left: 68px;
    position: relative;
}

#chat-page .chat-message i {
    position: absolute;
    width: 42px;
    height: 42px;
    overflow: hidden;
    left: 10px;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 42px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    font-style: normal;
    text-transform: uppercase;
}

#chat-page .chat-message span {
    color: #333;
    font-weight: 600;
}

#chat-page .chat-message p {
    color: #43464b;
}

#messageForm .input-group input {
    float: left;
    width: calc(100% - 85px);
}

#messageForm .input-group button {
    float: left;
    width: 80px;
    height: 38px;
    margin-left: 5px;
}

.chat-header {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #ececec;
}

.chat-header h2 {
    margin: 0;
    font-weight: 500;
}

.connecting {
    padding-top: 5px;
    text-align: center;
    color: #777;
    position: absolute;
    top: 65px;
    width: 100%;
}

@media screen and (max-width: 730px) {
    .chat-container {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
    }
}

@media screen and (max-width: 480px) {
    .chat-container {
        height: calc(100% - 30px);
    }

    .username-page-container {
        width: auto;
        margin-left: 15px;
        margin-right: 15px;
        padding: 25px;
    }

    #chat-page ul {
        height: calc(100% - 120px);
    }

    #messageForm .input-group button {
        width: 65px;
    }

    #messageForm .input-group input {
        width: calc(100% - 70px);
    }

    .chat-header {
        padding: 10px;
    }

    .connecting {
        top: 60px;
    }

    .chat-header h2 {
        font-size: 1.1em;
    }
}
</style>
