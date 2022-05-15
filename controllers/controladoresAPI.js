const { contenedor } = require("../database/databaseProducts.js");

const controladoresAPI = {
    
    getAllProducts: (req, res) => {
        contenedor.loadProducts()
        .then(()=> res.send(contenedor.productList.map(product => `<p>${product.title}: ${product.thumbnail}</p>`).join(``)))
        },
    
    getRandomProduct: (req, res)=>{
        contenedor.loadProducts()
        .then(()=> res.send(`${contenedor.productList[Math.floor(Math.random() * contenedor.productList.length)].title}`))
    },

    getProductById: (req, res) => {
        
        const id = parseInt(req.params.id);
        
        contenedor.getByID(id)
        .then((resp) => res.json(resp))
        .catch((err) => {
            if (err.type === "item not found") {
                res.status(404).json({error: err.message})
                
            } else {
                res.status(500).json({error: "An error occurred, please check your ID or try a different one"})
            }
        })
    },

    postProduct: (req, res) => {
        
        contenedor.addProduct(req.body)
        .then((newProduct) =>{

            res.status(201).json(newProduct)
        
        })
        .catch((err) => res.status(400).json(err.message))
    },

    deleteProduct: (req, res) => {
        const id = req.params.id;
       
        contenedor.deleteById(parseInt(id))
        .then(()=>res.send("Product removed successfully"))
        .catch((err) => res.status(500).json({error: err.message}))
    },
    
    updateProduct: (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.body;

        try {
            contenedor.updateProduct(id, data)
            .then((resp)=>res.status(200).json(resp))
        } catch (err) {
            if (err.type === "Not found in db") {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
        
    }
};

module.exports = {controladoresAPI};