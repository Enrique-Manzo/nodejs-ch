const fs = require("fs");
const http = require("http")
const express = require("express");

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
            console.log(err)
        }

    }

    async save(product) {

        const itemInCart = this.productList.some((item) => product.id === item.id);

        itemInCart ? console.log("Product already on the list") : this.productList = [...this.productList, product]

        if (itemInCart == false) {
            this.productListToFile("Product saved to file")
        }

    }

    async getByID(number) {
        
        let productById = [];

        try {
            const data = await fs.promises.readFile(fileRoute, "utf-8");
            productById = JSON.parse(data);
         } catch (err) {
            console.log(err)
         }

        return productById.filter(producto => {return producto.id === number})
    }

    getAll() {
        return this.productList
    }

    async deleteById(number) {      
        
        this.productList = await this.productList.filter(producto => producto.id !== number)

        this.productListToFile("The selected product has been removed from the products file");
    }

    async deleteAll() {
        
        try {
            await fs.promises.writeFile(fileRoute, "[]", {encoding:"utf-8", flag:"w"});
            console.log("All products have been removed");
        } catch (err) {
            console.log(err)
        }

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


const chair = new Producto(1, "Coastal Chair", 250.5, "https://res.cloudinary.com/dovuoehfu/image/upload/v1648905170/Product-Images/coastal-outdoor-swivel-chair-1-z_b8ylt1.jpg");
const armoire = new Producto(2, "Classy Armoire", 854, "https://res.cloudinary.com/dovuoehfu/image/upload/v1648905171/Product-Images/mid-century-armoire-c_csjzem.jpg");
const wallRack = new Producto (3, "Wall Rack", 321, "https://res.cloudinary.com/dovuoehfu/image/upload/v1648905171/Product-Images/mid-century-wall-rack-acorn-z_vehx6u.jpg");


// Cargar productos
/*
contenedor.loadProducts()
.then(()=> {console.log(contenedor.productList)})
.then(() => contenedor.save(wallRack)) // guardar productos
.then(() => contenedor.save(chair))
.then(() => contenedor.getByID(2).then(resp => console.log(resp))) // Buscar productos por ID
.then(() => console.log(contenedor.getAll())) // Retornar todos
.then(() => contenedor.deleteById(3).then(()=> console.log(contenedor.productList))) // Borrar según el ID
.then(() => contenedor.deleteAll()) // Borrar todos
*/

/*
const server = http.createServer((req, resp) => {
    resp.end("Hola Mundo");
})

const connectedServer = server.listen(8080, ()=> {
    console.log(`Server running on port ${connectedServer.address().port}`)
})
*/

const app = express();

app.get("/", (req, res) => {

    contenedor.loadProducts()
    .then(()=> contenedor.save(wallRack))
    .then(()=> contenedor.save(armoire))
    .then(()=> contenedor.save(chair))
    .then(()=> res.send(contenedor.productList.map(product => `<p>${product.title}: ${product.thumbnail}</p>`).join(``)))

    
})
app.get("/productoRandom", (req, res)=>{
    contenedor.loadProducts()
    .then(()=> res.send(`${contenedor.productList[Math.floor(Math.random() * contenedor.productList.length)].title}`))
})

const server = app.listen(8080, ()=>{
    console.log(`Server listening on port ${server.address().port}`)
});

server.on("error", error => console.log(`Server error ${error}`));