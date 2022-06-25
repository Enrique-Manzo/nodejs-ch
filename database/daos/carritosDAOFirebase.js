import contenedorFirebase from "../contenedores/contenedorFIrebase";

export default class carritosDAOFirebase extends contenedorFirebase() {
    constructor() {
        this.collectionName = "";
    }
}