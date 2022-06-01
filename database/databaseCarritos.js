import fs from "fs";
import contenedor from "./databaseProducts.js";
const fileRoute = "carritos.txt";

class ContenedorCarrito {
    constructor(){
        this.cartList = []
    }

    async loadCarts() {
        const data = await fs.promises.readFile(fileRoute);
        if (data.length > 0) {
            const objects = JSON.parse(data)
            this.cartList = objects;
        }
    }

    async cartListToFile (message) {
        const productString = JSON.stringify(this.cartList)

        try {
            await fs.promises.writeFile(fileRoute, productString, {encoding:"utf-8", flag:"w"});
            console.log(message);
        } catch (err) {
            throw err;
        }

    }

    async createCart() {
    
        this.loadCarts();

        const Cart = {
            id: Date.now(),
            timestamp: Date().toLocaleString(),
            products: [],
        };

        this.cartList.push(Cart);

        this.cartListToFile("Cart saved to file");

        return Cart.id;

    }

    async deleteCart(id) {  
               
        this.loadCarts()
        .then(()=>{
            
            const cartExists = this.cartList.some((cart) => cart.id === id);

            if (cartExists) {
                this.cartList = this.cartList.filter(cart => cart.id !== id)
            } else {
                return new Error("A cart with that ID was not found.")
            }
            

        })
        .then(() => {
            this.cartListToFile("The selected cart has been removed from the cart file")
        })
        
    }

    async addProduct(id, productID) {
        
        let allCarts = [];

        try {
            const cartData = await fs.promises.readFile(fileRoute, "utf-8");
            allCarts = JSON.parse(cartData);
         } catch (err) {
            console.log(err)
         }
        
         // Finds the cart index in the newly loaded list
        const index = allCarts.findIndex((cart)=>{return cart.id === id})
        
         if (index === undefined) {
             const error = new Error("Cart not found")
             error.type = "Not found in db";
             throw error
         }

        const queriedProduct = await contenedor.getByID(productID)

        console.log(queriedProduct)
        
        allCarts[index].products.push(queriedProduct[0]);

        const cartString = JSON.stringify(allCarts)

        try {
            await fs.promises.writeFile(fileRoute, cartString, {encoding:"utf-8", flag:"w"});
        } catch (err) {
            throw err;
        }

        return allCarts[index]
        
    }

    async getAllCartProducts(id) {
        await this.loadCarts()
        
        const cartExists = this.cartList.some((cart) => cart.id === id);
        
        if (cartExists) {
            const queriedCart = this.cartList.filter(cart => cart.id === id);
 
            return queriedCart[0].products;
        } else {
            return new Error("A cart with that ID was not found.")
        }
    
    }

    async deleteCartProduct(cartID, productID) {
        await this.loadCarts();

        const queriedCart = this.cartList.filter(cart => cart.id === cartID)[0];

        queriedCart.products = queriedCart.products.filter(product => product.id !== productID);

        this.cartList = this.cartList.filter(cart => cart.id !== cartID)

        this.cartList.push(queriedCart);

        await this.cartListToFile("Cart product removed successfully");

        return queriedCart;

    }

}

const contenedorCarrito = new ContenedorCarrito();

export default contenedorCarrito;