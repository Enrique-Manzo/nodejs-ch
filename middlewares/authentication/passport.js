import passport from "passport";
import { Strategy } from "passport-local";

passport.use("registration", new Strategy(
    {
        passReqToCallback: true,
        // usernameField: 'email',
        // passwordField: 'contrasenia',
    },

    (req, username, password, done) => {
        try {
            const datosUsuario = req.body
            const usuario = registrarUsuario(req.body)
            done(null, usuario)
            // done(null, usuario, info) // donde info es un objeto, opcional
        } catch (error) {
            done(error)
            // done(error, null, info) // donde info es un objeto, opcional
        }
    })
)