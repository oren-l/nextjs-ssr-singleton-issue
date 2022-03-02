import axios from "axios";
import { isBrowser } from "../../utils/is-browser";

const client = axios.create({
    baseURL: isBrowser() ? '/api' : 'http://localhost:3000/api'
})

let messageQueue: string[] = []

type PendingMessages = string[]

type ClientChat = (message: string) => Promise<PendingMessages>

const noSsrChat: ClientChat = async (message) => {
    messageQueue.push(message);
    if (messageQueue.length >= 5) {
        await client.post('/chat', { messages: messageQueue })
        messageQueue = []
    }
    return messageQueue
}

const ssrChat: ClientChat = async (message) => {
    await client.post('/chat', { messages: [message] })
    return []
}

export const chat = isBrowser() ? noSsrChat : ssrChat