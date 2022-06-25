import { SQLClientAdmin } from "./SQLClient.js";

export async function addWatch(watch) {
    await SQLClientAdmin.insert(watch).into("watches");
};

export async function getWatches() {
    const data = await SQLClientAdmin.select("*").from("watches");
    
    return data
}
