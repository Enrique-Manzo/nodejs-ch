import { SQLiteClient } from "./SQLClient.js";

export async function addMessage(messages) {
    await SQLiteClient.insert(messages).into("messages");
};

export async function getMessages() {
    const data = await SQLiteClient.select("*").from("messages");
    
    return data
}
