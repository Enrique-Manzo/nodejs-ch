import Router from "express";
import controladoresWeb from "../controllers/controladoresWeb.js";

const routerWeb = new Router()

routerWeb.get("/", controladoresWeb.index)
routerWeb.get("/watches", controladoresWeb.watches)
routerWeb.get("/about", controladoresWeb.about)
routerWeb.get("/chat", controladoresWeb.contact)

export default routerWeb