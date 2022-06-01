import contenedor from "../database/databaseProducts.js";

export const controladoresForm = {

    postProduct: (req, res) => {

        contenedor.addProduct(req.body)
        .then((newProduct) =>{

            res.status(201).json(newProduct)
        
        })
        .catch((err) => res.status(400).json(err.message))

        res.redirect("/");
    }

}

