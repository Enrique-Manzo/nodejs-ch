import express from "express";
import { Server as SocketServer } from "socket.io";
import {controladoresForm} from "./controllers/controladoresForm.js"
import routerWeb from "./routers/routerWeb.js";
import routerAPI from "./routers/routerAPI.js";
import {engine} from "express-handlebars";
import { getMessages, addMessage } from "./database/messages.js";
import watches from "./database/watches.js";
import {Server as HttpServer} from "http";

// PATHS
import * as path from 'path'; //const path = require('path');
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
        socket.emit("conexionOK", {messages: messages})
    })
    
    socket.on("message", async (message)=>{
        await addMessage(message)
        getMessages()
        .then((messages)=>{
            io.sockets.emit("conexionOK", { messages: messages })
        })
    })
    
    socket.on("requestWatchesData", (data)=>{
        const newWatch = {
            name: data.name,
            price: data.price,
            tag: data.tag,
            image: data.image
        }
        watches.push(newWatch)
        socket.emit("watchesData", {watches: watches})
    })

    socket.emit("watchesData", {watches: watches})
    
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