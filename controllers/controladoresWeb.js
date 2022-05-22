const watches = require("../database/watches.js");

const controladoresWeb = {
    index: (req, res) => {res.render("main", {layout: "index", name: "Enrique", watches: watches})},
    watches: (req, res) => {res.render("watches", {layout: "index", watches: watches})},
    about: (req, res) => {res.render("about", {layout: "index"})},
    contact: (req, res) => {res.render("chat", {layout: "index"})}
}

module.exports = {controladoresWeb}