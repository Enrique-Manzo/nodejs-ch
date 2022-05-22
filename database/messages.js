const fs = require("fs");
const fileRoute = "./messages.txt";

async function addMessage(messages) {
    console.log(messages)
    const jsonMessages = JSON.stringify(messages)
    await fs.promises.writeFile(fileRoute, jsonMessages, {encoding:"utf-8", flag:"w"});
};

async function getMessages() {
    const data = await fs.promises.readFile(fileRoute);
    const loadedMessages = JSON.parse(data)
     
    return loadedMessages
}

module.exports = {
    addMessage, getMessages
}

