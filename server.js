const fs = require("fs");
const http = require("http")
const express = require("express");
const { controladoresForm } = require("./controllers/controladoresForm.js");
const routerWeb = require("./routers/routerWeb.js");
const routerAPI = require("./routers/routerAPI.js");
const { engine } = require("express-handlebars");

// PATHS
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

// APP
const app = express();

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
const server = app.listen(8080, ()=>{
    console.log(`Server listening on port ${server.address().port}`)
});

// ERROR CALLS
server.on("error", error => console.log(`Server error ${error}`));