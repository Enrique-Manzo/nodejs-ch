import ContenedorMongoDB from "../database/contenedores/contenedorMongoDB.js";
import { ObjectId } from "mongodb";
const mongo = new ContenedorMongoDB();
import {mail} from "../communication/emails/sendgridConfig.js";
import twilio from "twilio";

const ADMIN_EMAIL = "enq.manzo@gmail.com";

const controladoresAPICarrito = {
    
    getUserId: (req, res) => {
        if (req.session?.passport?.user == undefined) {
            res.status(500).json({"error": "please log in"})
        }

        res.json({
            "user_id": req.session.passport.user.id,
            "username": req.session.passport.user.username,
        })
    },

    deleteCart: async (req, res) => {
        
        const id = req.params.id;
        
        contenedorCarrito.deleteCart(parseInt(id))
        .then(()=>{
            res.status(200).json({"message": "the selected cart has been emptied."})
        })
        .catch((err) => res.status(500).json({"message": err.message}))
    },

    postProductToCart: async (req, res) => {
        const userId = req.body.user_id;
        const productId = parseFloat(req.body.product_id);
       
        try {
            const product = await mongo.findProductById(productId);
            const cart = await mongo.findActiveCartsByUserId(userId);
          
            if (cart) {
                cart.products.push(product);

                await mongo.updateProductList(cart.id, cart.products);
            
                res.json({"message": "success"})

            } else {
                const newCart = {
                    id: Math.random().toString(36).substring(2, 9),
                    owner_id: userId.toString(),
                    date: new Date(),
                    products: [],
                    status:"open"
                }

                newCart.products.push(product);

                await mongo.insertObject("ecommerce", "carritos", newCart);

                res.json({"message": "success"})
            }
            
        } catch(err) {
            res.json({"error": err})
        }
    },

    postFinishPurchase: async (req, res) => {
       
        const cartId = req.body.cartId;
        const userId = req.body.userId

        try {
            const cart = await mongo.findActiveCartsByUserId(userId);
            const user = await mongo.readById("ecommerce", "users", parseFloat(userId));
            
            const msg = {
                to: ADMIN_EMAIL,
                from: ADMIN_EMAIL,
                subject: `Nuevo pedido de ${user.fname} | ${user.username}`,
                text: `Nuevo pedido`,
                html: `<ul>
                            ${cart.products.map(product => {return "<li>" + product.name + " | " + product.price + "</li>"})}
                        </ul>`,
            };
        
            mail.send(msg);

            await mongo.closeOpenCartById(cartId)

            const client = twilio(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN)

            const options = {
                body: `Your purchase has been received and it's being processed. You cart id is ${cart.id}`,
                from: "+19592071608",
                to: "+34627276291" // esto se le enviaría a un usuario, pero la cuenta de prueba de Twilio no lo permite
            };

            await client.messages.create(options);

            client.messages.create({ 
                body: `Nuevo pedido de ${user.fname} | ${user.username}`, 
                from: 'whatsapp:+14155238886',       
                to: 'whatsapp:+5492245423083' 
            }) 
            .then(message => console.log(message.sid))

            res.status(200).json({"message": "success"})

        } catch(error) {
            console.log(error)
        }

        
    },

    postAddProductToCart: (req, res)=>{

        const idCarrito = parseInt(req.params.id);

        const productID = req.body.productID;

        contenedorCarrito.addProduct(idCarrito, parseInt(productID))
        .then(()=>{
            res.status(200).json({"message": "product added successfully."})
        })
        .catch( (err) => {
            if (err.type === "Not found in db") {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        })


    },

    getAllCartProducts: (req, res) => {
        const idCarrito = parseInt(req.params.id);
        
        contenedorCarrito.getAllCartProducts(idCarrito)
        .then((products)=>{
            res.status(200).json({products})
        })
        .catch((err) => {
            res.status(500).json({"error": err})
        })
    },

    deleteCartProduct: (req, res) => {

        const idCarrito = parseInt(req.params.id);
        const idProducto = parseInt(req.params.id_prod);

        contenedorCarrito.deleteCartProduct(idCarrito, idProducto)
        .then((cart)=>{
            res.status(200).json(cart)
        })
    
    }
};

export default controladoresAPICarrito;