import { getConfig } from "./knexConfig.js";
import crearKnex from "knex";

const SQLClientAdmin = crearKnex(getConfig("MYSQL2"));
const SQLiteClient = crearKnex(getConfig("MYSQL2"));


export { SQLClientAdmin, SQLiteClient }