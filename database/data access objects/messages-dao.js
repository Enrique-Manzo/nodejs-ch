import database from "../contenedores/contenedorMongoDB.js";
import DataTransferObject from "../data transfer objects/dtos.js";

export class messagesDAO {

    // GETS
    async getAllmessages () {

        const allMessages = await database.readAll("ecommerce", "messages");

        const dtoMessages = []

        for (let message of allMessages) {
            dtoMessage = new DataTransferObject("message", message)

            dtoMessages.push(dtoMessage)
        }

        return dtoMessages;
    }

    async findMessageById(messageId) {
        const dbMessage = await database.readById("ecommerce", "Messages", messageId);

        const dtoMessage = new DataTransferObject("message", dbMessage)

        return dtoMessage;
    }

    // ADDS

    async addMessage(message) {

        const dtoMessage = new DataTransferObject("message", message)

        await database.insertObject("ecommerce", "messages", dtoMessage)

        return dtoMessage
    }    

}

const MessageManager = new MessageDAO();

export default MessageManager;