const { Router } = require("express");
const { controladoresAPI } = require("../controllers/controladoresAPI.js");

const routerAPI = new Router();

routerAPI.get("/productos", controladoresAPI.getAllProducts);
routerAPI.get("/productoRandom", controladoresAPI.getRandomProduct);
routerAPI.get("/product/:id", controladoresAPI.getProductById);
routerAPI.post("/product", controladoresAPI.postProduct);
routerAPI.delete("/product/:id", controladoresAPI.deleteProduct);
routerAPI.put("/product/:id", controladoresAPI.updateProduct);

module.exports = routerAPI;