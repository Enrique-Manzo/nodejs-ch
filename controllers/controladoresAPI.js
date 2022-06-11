import contenedor from "../database/databaseProducts.js";
import { SQLClientAdmin } from "../database/SQLClient.js";


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
        
    }
};

export default controladoresAPI;