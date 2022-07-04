import express from "express";
import { Server as SocketServer } from "socket.io";
import {controladoresForm} from "./controllers/controladoresForm.js"
import routerWeb from "./routers/routerWeb.js";
import routerAPI from "./routers/routerAPI.js";
import {engine} from "express-handlebars";
import { getMessages, addMessage } from "./database/messages.js";
import { getWatches, addWatch } from "./database/watches.js";
import {Server as HttpServer} from "http";
import session from "express-session";
import MongoStore from "connect-mongo";
import sfs from "session-file-store";
import cors from "cors";

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
    
    socket.on("requestWatchesData", async (data)=>{
        
        await addWatch(data);
        getWatches()
        .then((watches)=>{
            socket.emit("watchesData", {watches: watches})
        })
    })

    getWatches()
        .then((watches)=>{
            socket.emit("watchesData", {watches: watches})
        })
    
})

// CORS OPTIONS

const whitelist = ['http://localhost:3030', 'http://localhost:8080']; //white list consumers
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

// SESSION FILE STORE

const FileStore = sfs(session)

// APP SETTINGS
app.use(express.static(publicPath));
app.use(express.json()); // checks whether there's a json object in the req body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: "CbFh!M,;e3vm?hz:",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://root:panzerfaust@localhost:27017/sessions?authSource=admin&w=1" }),
}));
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