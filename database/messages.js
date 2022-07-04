import { SQLiteClient } from "./SQLClient.js";
import ContenedorMongoDB from "./contenedores/contenedorMongoDB.js";
import { schema, normalize, denormalize } from "normalizr";
import util from "util";

/*
export async function addMessage(messages) {
    await SQLiteClient.insert(messages).into("messages");
};

export async function getMessages() {
    const data = await SQLiteClient.select("*").from("messages");
    
    return data
}
*/

export async function addMessage(message) {
    const db = new ContenedorMongoDB();
    await db.insertObject("ecommerce", "mensajes", message)
}

export async function getMessages() {
    const db = new ContenedorMongoDB();
    
    const messages = await db.readAll("ecommerce", "mensajes", true);

    // Normalización y desnormalización con normalizr
    const chat = {
        id: "mensajes",
        messages: messages,
    }

    const authorSchema = new schema.Entity("authors");
    
    const messageSchema = new schema.Entity("messages", {
        author: authorSchema,
    }, {idAttribute: "_id"});

    const chatSchema = new schema.Entity("chats", {
        messages: [messageSchema],
    })

    const normalizedMessages = normalize(chat, chatSchema);
    
    const denormalizedMessages = denormalize(normalizedMessages.result, chatSchema, normalizedMessages.entities)
    

    return messages
}