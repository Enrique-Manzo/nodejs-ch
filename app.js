const fs = require("fs");

const fileRoute = "products.txt";

async function readFile() {

    try {
        const data = await fs.promises.readFile(fileRoute, "utf-8");
        console.log(data)
     } catch (err) {
        console.log(err)
     }

}

readFile();


class Contenedor {
    constructor(){
        this.productList = []
    }

    save(product) {

        const itemInCart = this.productList.some((item) => product.id === item.id);

        itemInCart ? console.log("Product already on the list") : this.productList = [...this.productList, product]
    }

    getByID(number) {
        return this.productList.filter(producto => {return producto.id === number})
    }

    getAll() {
        return this.productList
    }

    deleteById(number) {
        this.productList = this.productList.filter(producto => producto.id !== number)
    }

    deleteAll() {
        this.productList = []
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

const contenedor = new Contenedor();


const chair = new Producto(1, "Coastal Chair", 250.5, "https://res.cloudinary.com/dovuoehfu/image/upload/v1648905170/Product-Images/coastal-outdoor-swivel-chair-1-z_b8ylt1.jpg");
const armoire = new Producto(2, "Classy Armoire", 854, "https://res.cloudinary.com/dovuoehfu/image/upload/v1648905171/Product-Images/mid-century-armoire-c_csjzem.jpg");
const wallRack = new Producto (3, "Wall Rack", 321, "https://res.cloudinary.com/dovuoehfu/image/upload/v1648905171/Product-Images/mid-century-wall-rack-acorn-z_vehx6u.jpg");
