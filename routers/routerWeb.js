const { Router } = require("express");
const { controladoresWeb } = require("../controllers/controladoresWeb.js");

const routerWeb = new Router()

routerWeb.get("/", controladoresWeb.index)
routerWeb.get("/watches", controladoresWeb.watches)
routerWeb.get("/about", controladoresWeb.about)
routerWeb.get("/chat", controladoresWeb.contact)

module.exports = routerWeb;