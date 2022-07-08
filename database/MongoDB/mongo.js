import { MongoClient } from "mongodb";

const host = "localhost";
const port = 27017;

const username = "root";
const password = "panzerfaust";

//const uri = `mongodb://${host}:${port}`;
const uri = "mongodb+srv://enriquemanzoadmin:n5nmsLrfYidDeqig@cluster0.sjio4.mongodb.net/?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        /*
        authSource: "admin",
        auth: {
            username,
            password
        }
        */
    }
)

export default mongoClient