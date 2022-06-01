import fs from "fs";
const fileRoute = "./messages.txt";

export async function addMessage(messages) {
    const jsonMessages = JSON.stringify(messages)
    await fs.promises.writeFile(fileRoute, jsonMessages, {encoding:"utf-8", flag:"w"});
};

export async function getMessages() {
    const data = await fs.promises.readFile(fileRoute);
    const loadedMessages = JSON.parse(data)
     
    return loadedMessages
}
