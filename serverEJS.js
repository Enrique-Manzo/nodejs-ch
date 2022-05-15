const fs = require("fs");
const http = require("http")
const express = require("express");

// PATHS
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

// APP
const app = express();

// APP SETTINGS
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./viewsEJS");

// ROUTES
app.get("/", (req, res) => {
    res.render("index", {watches: require("./database/watches.js")})
}); // handles static files

// SERVER
const server = app.listen(8082, ()=>{
    console.log(`Server listening on port ${server.address().port}`)
});

// ERROR CALLS
server.on("error", error => console.log(`Server error ${error}`));