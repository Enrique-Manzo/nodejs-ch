import mongoose from "mongoose";

const host = "localhost";
const port = 27017;

const username = "root";
const password = "panzerfaust";

const uri = `mongodb://${username}:${password}@${host}:${port}?authSource=admin`;

await mongoose.connect(uri)

const productSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    tag: {type: String, required: true},
    image: {type: String, required: true},
    featured: {type: Boolean, required: true},
    stock: {type: Number, required: true},
    description: {type: String, required: true}
});

const dbProducts = mongoose.model("productos", productSchema);

/*
const Producto = new Producto({});
producto.price = 200;
await Producto.save();

*/


try {

    /*
    await dbProducts.create({
        id: 165321231235,
        name: "IOWODO asdad",
        price: 1200.99,
        tag: "New",
        image: "images/w6.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    })
    */
    const productos = await dbProducts.find();

    console.log(productos);
} catch(error) {
    console.log(error)
}
