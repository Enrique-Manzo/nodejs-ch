import fs from "fs";
const fileRoute = "products.txt";

class ContenedorArchivo {
    constructor(){
        this.productList = []
    }

    async loadProducts() {
        const data = await fs.promises.readFile(fileRoute);
        if (data.length > 0) {
            const objects = JSON.parse(data)
            this.productList = objects;
        }
    }

    async productListToFile (message) {
        const productString = JSON.stringify(this.productList)

        try {
            await fs.promises.writeFile(fileRoute, productString, {encoding:"utf-8", flag:"w"});
            console.log(message);
        } catch (err) {
            throw err;
        }

    }

    async addProduct(product) {

        this.loadProducts()
        .then(()=>{

            const itemInCart = this.productList.some((item) => product.title === item.title);

            product.id = Date.now();

            if (itemInCart) {
                return new Error("Product already on the list")
            } else {
                this.productList = [...this.productList, product]
            }

            if (itemInCart == false) {
                this.productListToFile("Product saved to file")
            }
        })
        .then(()=> {return product})
    }

    async getByID(number) {
        
        let productById = [];

        try {
            const data = await fs.promises.readFile(fileRoute, "utf-8");
            productById = JSON.parse(data);
         } catch (err) {
            console.log(err)
         }

        const queriedProduct = productById.filter(producto => {return producto.id === number})
       
        if (queriedProduct.length > 0) {
            return queriedProduct;
        } else {
            const error = new Error("Product not found");
            error.type = "item not found";
            throw error;
        }
        
    }

    getAll() {
        return this.productList
    }

    async deleteById(number) {  
        
        this.loadProducts()
        .then(()=>{
        
            this.productList = this.productList.filter(producto => producto.id !== number)

        })
        .then(() => {
            this.productListToFile("The selected product has been removed from the products file")
        })
    }

    async deleteAll() {
        
        try {
            await fs.promises.writeFile(fileRoute, "[]", {encoding:"utf-8", flag:"w"});
            console.log("All products have been removed");
        } catch (err) {
            console.log(err)
        }

    }

    async updateProduct(id, data) {
        
        let allProducts = [];

        try {
            const productData = await fs.promises.readFile(fileRoute, "utf-8");
            allProducts = JSON.parse(productData);
         } catch (err) {
            console.log(err)
         }
        
        const index = allProducts.findIndex((product)=>{return product.id === id})
        
         if (index === undefined) {
             const error = new Error("Product not found")
             error.type = "Not found in db";
             throw error
         }

        allProducts[index] = data;

        const productString = JSON.stringify(allProducts)

        try {
            await fs.promises.writeFile(fileRoute, productString, {encoding:"utf-8", flag:"w"});
        } catch (err) {
            throw err;
        }

        return allProducts[index]
        
    }

}

class Producto {
    constructor(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const contenedor = new ContenedorArchivo();

export default contenedor