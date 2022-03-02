import axios, { AxiosError } from "axios";

const client = axios.create({
    baseURL: '/api'
})

let messageQueue: string[] = []

export async function chat(message: string) {
    messageQueue.push(message);
    if (messageQueue.length >= 5) {
        const res = await client.post('/chat', { messages: messageQueue })
        messageQueue = []
        return res
    } else {
        return
    }
}