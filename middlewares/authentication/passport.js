import passport from "passport";
import { Strategy } from "passport-local";
import ContenedorMongoDB from "../../database/contenedores/contenedorMongoDB.js";


const mongo = new ContenedorMongoDB();

async function authenticateUser(username, password) {
    const username_ = username;
    const password_ = password;
    
    const user = await mongo.findByUsername("ecommerce", "users", username_)
    
    if (user) {
        if (username_ == user.username && password_ == user.password) {
            
            return user
            //res.status(200).json({"message": "login successful"})
        } else {
            throw new Error("Authentication error")
            //return res.status(401).send("Authentication error")
        }
    }
}

async function registrarUsuario(datos) {
    const user = await mongo.insertObject("ecommerce", "users", datos)

    return user
}


passport.use("registration", new Strategy(
    {
        passReqToCallback: true,
        // usernameField: 'email',
        // passwordField: 'contrasenia',
    },

    async (req, username, password, done) => {
        try {
            const datosUsuario = req.body
            const usuario = await registrarUsuario(datosUsuario)
            done(null, usuario)
            // done(null, usuario, info) // donde info es un objeto, opcional
        } catch (error) {
            done(error)
            // done(error, null, info) // donde info es un objeto, opcional
        }
    })
);

passport.use("login", new Strategy(
    (username, password, done) => {
        
        try {
            const usuario = authenticateUser(username, password)
            done(null, usuario)
        } catch (err) {
            done(null, false)
        }
    }
))

passport.serializeUser(async function(user, done) {
    const userObject = await user;
    done(null, userObject);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

export const passportMiddleware = passport.initialize();
export const passportSessionHandler = passport.session()