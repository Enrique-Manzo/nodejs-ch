import { MongoClient } from "mongodb";

const host = "localhost";
const port = 27017;

const username = "root";
const password = "panzerfaust";

const uri = `mongodb://${host}:${port}`;

const mongoClient = new MongoClient(uri,
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
    await mongoClient.connect();

    const dbEcommerce = mongoClient.db("ecommerce");

    const dbProductos = dbEcommerce.collection("productos");

    const productos = await dbProductos.find().toArray();

    console.log(productos);

} catch(error) {
    console.log(error)
} finally {
    await mongoClient.close();
}

export default mongoClient