import { MongoClient } from "mongodb";

const host = "localhost";
const port = 27017;

const username = "root";
const password = "panzerfaust";

const uri = `mongodb://${host}:${port}`;

const MongoClient = new MongoClient(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
        auth: {
            username,
            password
        }
    }
)

try {
    await MongoClient.connect();

    const dbEcommerce = MongoClient.db("ecommerce");

    const dbProductos = dbEcommerce.collection("productos");

    const productos = await dbProductos.find().toArray();

    console.log(productos);

} catch(error) {
    console.log(error)
} finally {
    await MongoClient.close();
}

export default MongoClient