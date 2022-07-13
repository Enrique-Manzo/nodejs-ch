import { SQLClientAdmin } from "../database/SQLClient.js";
import ContenedorMongoDB from "../database/contenedores/contenedorMongoDB.js";

const mongoDB = new ContenedorMongoDB();

const controladoresWeb = {
    index: async (req, res) => {
        res.render("main", {layout: "index", name: req.session.passport?.user?.username, watches: await mongoDB.readAll("ecommerce", "productos")})
    },
    watches: async (req, res) => {res.render("watches", {layout: "index", name: req.session.user, watches: await mongoDB.readAll("ecommerce", "productos")})},
    about: (req, res) => {res.render("about", {layout: "index", name: req.session.user})},
    contact: (req, res) => {res.render("chat", {layout: "index", name: req.session.user})},
    login: (req, res) => {res.render("login", {layout: "index", name: req.session.user})},
    signup: (req, res) => {res.render("signup", {layout: "index", name: req.session.passport?.user?.username})},
    logout: async (req, res) => {
        req.session.destroy()

        res.render("main", {layout: "index", watches: await mongoDB.readAll("ecommerce", "productos")})
    }
}

export default controladoresWeb;