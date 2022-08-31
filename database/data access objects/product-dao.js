import database from "../contenedores/contenedorMongoDB.js";

class ProductDAO {

    // GETS
    async getAllProducts () {

        const allProducts = await database.readAll("ecommerce", "productos");
        
        return allProducts;
    }

    async findProductById(productId) {
        const product = await database.readById("ecommerce", "productos", productId);

        return product;
    }

    // ADDS

    async addProduct(product) {
        await database.insertObject("ecommerce", "productos", product)

        return
    }

    // UPDATE

    async updateStock(productId) {
        database.updateOne("ecommerce", "productos", {id: productId}, {stock: {$subtract: ["stock", 1]}})
    }
    

}

const ProductManager = new ProductDAO();

export default ProductManager;