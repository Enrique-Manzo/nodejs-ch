import { SQLClientAdmin } from "../database/SQLClient.js"

const controladoresWeb = {
    index: async (req, res) => {
        res.render("main", {layout: "index", name: "Enrique", watches: await SQLClientAdmin.select("*").from("watches")})
    },
    watches: async (req, res) => {res.render("watches", {layout: "index", watches: await SQLClientAdmin.select("*").from("watches")})},
    about: (req, res) => {res.render("about", {layout: "index"})},
    contact: (req, res) => {res.render("chat", {layout: "index"})}
}

export default controladoresWeb;