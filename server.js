const fs = require("fs");
const {Server: HttpServer} = require("http")
const express = require("express");
const { Server: SocketServer } = require("socket.io");
const { controladoresForm } = require("./controllers/controladoresForm.js");
const routerWeb = require("./routers/routerWeb.js");
const routerAPI = require("./routers/routerAPI.js");
const { engine } = require("express-handlebars");
const { getMessages, addMessage } = require("./database/messages.js");

// PATHS
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

// APP
const app = express();

// SOCKET

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

io.on("connection", (socket)=> {
    console.log("Socket connected");
    
    getMessages()
    .then((messages)=>{
        console.log(messages)
        socket.emit("conexionOK", {messages: messages})
    })
    
    socket.on("message", message=>{
        getMessages()
        .then((messages)=>{
            const allMessages = messages
            allMessages.push(message)
            
            return allMessages
        })
        .then((allMessages)=>{
            addMessage(allMessages)

            return allMessages
        })
        .then((allMessages)=>{
            io.sockets.emit("conexionOK", { messages: allMessages })
        })

    })
})

// APP SETTINGS
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// ROUTES
app.use("/", routerWeb); // handles static files
app.use("/api", routerAPI); // handles api calls
app.post("/product-form", controladoresForm.postProduct) // handled by Express - receives form posts

// SERVER
const server = httpServer.listen(8080, ()=>{
    console.log(`Server listening on port ${server.address().port}`)
});

// ERROR CALLS
server.on("error", error => console.log(`Server error ${error}`));