import { faker } from "@faker-js/faker";
import { fork } from 'child_process';
import ProductManager from "../database/data access objects/product-dao.js";

const controladoresAPI = {
    
    getAllProducts: async (req, res) => {
        const products = await ProductManager.getAllProducts();
        res.json(products)
        },
    
    getRandomProduct: async (req, res)=>{
        const products = await SQLClientAdmin.select("*").from("watches")
        const randomProduct = products[Math.floor(Math.random() * products.length)]
        res.json(randomProduct)
    },

    getProductById: async (req, res) => {
        
        const id = parseInt(req.params.id);
        
        const product = await SQLClientAdmin.select("*").from("watches").where({id: id})
        
        if (!product) {
            res.json({"message": "item not found"})
        } else {
            res.json(product)
        }
    },

    postProduct: async (req, res) => {
        
        const productData = req.body;

        const result = await SQLClientAdmin.insert(productData).into("watches");
        res.json(result)
    },

    deleteProduct: async (req, res) => {
        const id = parseInt(req.params.id);

        await SQLClientAdmin.delete().from("watches").where({id: id});
       
        res.json({"message": "product deletion successful."})

    },
    
    updateProduct: async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.body;

        await SQLClientAdmin.update(data).from("watches").where({id: id})

        res.json({"message": "Update successful."})
        
    },

    getTestProducts: async (req, res) => {
        console.log("test")
        const productArray = [];

        for (let i = 0; i < 5; i++) {
            const testProduct = {};

            testProduct.name = await faker.commerce.productName();
            testProduct.price = await faker.commerce.price(100,1000);
            testProduct.image = await faker.image.food();

            productArray.push(testProduct)
        }
        

        res.json(productArray);
    },

    // Esto es para testear un proyecto separado en el que estoy trabajando
    postAudio: async (req, res) => {
        console.log("hit")
        console.log(req.file)
    },

    postLogin: async (req, res) => {
        const username_ = req.body.username;
        const password = req.body.password;
        
        const user = await mongo.findByUsername("ecommerce", "users", username_)
        
        if (user) {
            if (username_ == user.username && password == user.password) {
                req.session.user = username_;
                req.session.admin = true;
                res.status(200).json({"message": "login successful"})
            } else {
                return res.status(401).send("Authentication error")
            }
    
        }
    
    },

    getRandoms: (req, res) => {
        const limit = parseInt(req.query.cant);       
 
        const calculation = fork("./controllers/randomCalculation.js");
        calculation.on("message", msg => {
            if (msg == "start") {
                calculation.send(limit)
            } else {
                res.json(msg)
            }
        })

    }
};

export default controladoresAPI;