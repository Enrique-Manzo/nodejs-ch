import { Router } from "express";
import controladoresAPI from "../controllers/controladoresAPI.js";
import controladoresAPICarrito from "../controllers/controladoresAPICarrito.js";
import contenedorCarrito from "../database/databaseCarritos.js";

const routerAPI = new Router();

let admin = false;

routerAPI.get("/login", (req, res)=>{admin=true; res.status(200).json({"message": "login successful"});})
routerAPI.get("/logout", (req, res)=>{admin=false; res.status(200).json({"message": "logout successful"});})

function adminCheck(req, res, next) {
    if (admin) {
        next()
    } else {
        res.status(401).json({"error":"You are not authorized to make this request"})
    }
};

// PRODUCTOS

routerAPI.get("/productos", controladoresAPI.getAllProducts);
routerAPI.get("/productoRandom", controladoresAPI.getRandomProduct);
routerAPI.get("/product/:id", controladoresAPI.getProductById);
routerAPI.post("/product", adminCheck, controladoresAPI.postProduct);
routerAPI.delete("/product/:id", adminCheck, controladoresAPI.deleteProduct);
routerAPI.put("/product/:id", adminCheck, controladoresAPI.updateProduct);

// CARRITO

routerAPI.get("/carrito/:id/productos", controladoresAPICarrito.getAllCartProducts);
routerAPI.post("/carrito", controladoresAPICarrito.postCart);
routerAPI.post("/carrito/:id", controladoresAPICarrito.postAddProductToCart);
routerAPI.delete("/carrito/:id", controladoresAPICarrito.deleteCart);
routerAPI.delete("/carrito/:id/productos/:id_prod", controladoresAPICarrito.deleteCartProduct);

export default routerAPI;