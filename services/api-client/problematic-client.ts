import axios from "axios";
import { isBrowser } from "../../utils/is-browser";


const client = axios.create({
    baseURL: isBrowser() ? '/api' : 'http://localhost:3000/api'
})

let messageQueue: string[] = []

type PendingMessages = string[]


export async function chat(message: string): Promise<PendingMessages> {
    messageQueue.push(message);
    if (messageQueue.length >= 5) {
        await client.post('/chat', { messages: messageQueue })
        messageQueue = []
    }
    return messageQueue
}