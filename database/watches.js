import { SQLClientAdmin } from "./SQLClient.js";
import ContenedorMongoDB from "./contenedores/contenedorMongoDB.js";

const mongoDB = new ContenedorMongoDB();

export async function addWatch(watch) {
    await mongoDB.insertObject("ecommerce", "productos", watch);
}

export async function getWatches() {
    const data = await mongoDB.readAll("ecommerce", "productos");

    return data
}
