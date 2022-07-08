import ContenedorMongoDB from "./contenedores/contenedorMongoDB.js";

export async function addMessage(message) {
    const db = new ContenedorMongoDB();
    await db.insertObject("ecommerce", "mensajes", message)
}

export async function getMessages() {
    const db = new ContenedorMongoDB();
    
    const messages = await db.readAll("ecommerce", "mensajes", true);

    return messages
}