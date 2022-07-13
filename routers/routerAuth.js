import Router from "express";
import {registrationController, loginController, 
        logoutController,
        successRegisterController,
        failRegisterController,
        successLoginController,
        failLoginController } from "../controllers/controladoresAuthentication.js";

const routerAuth = new Router()

// REGISTER
routerAuth.post("/register", registrationController);
routerAuth.post("/failRegister", failRegisterController);
routerAuth.post("/successRegister", successRegisterController)


// LOGIN
routerAuth.post("/login", loginController);
routerAuth.post("/failLogin", failLoginController);
routerAuth.post("/successLogin", successLoginController);


// LOGOUT
routerAuth.get("/logout", logoutController);



export default routerAuth;
