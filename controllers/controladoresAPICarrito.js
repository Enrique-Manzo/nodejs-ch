import contenedorCarrito from "../database/databaseCarritos.js";

const controladoresAPICarrito = {
    
    postCart: (req, res) => {
        
        contenedorCarrito.createCart()
        .then((cartID) =>{

            res.status(200).json({"cartID": cartID})
        
        })
        .catch((err) => res.status(400).json(err.message))
    },

    deleteCart: async (req, res) => {
        
        const id = req.params.id;
        
        contenedorCarrito.deleteCart(parseInt(id))
        .then(()=>{
            res.status(200).json({"message": "the selected cart has been emptied."})
        })
        .catch((err) => res.status(500).json({"message": err.message}))
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

        controladoresAPICarrito.deleteCartProduct(idCarrito, idProducto)
        .then((cart)=>{
            res.status(200).json(cart)
        })
    
    }
};

export default controladoresAPICarrito;