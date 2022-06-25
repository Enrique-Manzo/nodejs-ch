import contenedor from "../database/databaseProducts.js";
import { SQLClientAdmin } from "../database/SQLClient.js";
import { faker } from "@faker-js/faker";


const controladoresAPI = {
    
    getAllProducts: async (req, res) => {
        const products = await SQLClientAdmin.select("*").from("watches")
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
    }
};

export default controladoresAPI;