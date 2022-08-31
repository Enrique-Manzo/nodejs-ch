import { CartDAO } from "../data access objects/carts-dao";
import { UsersDAO } from "../data access objects/users-dao";
import { SaleDAO } from "../data access objects/sale-dao";

export default class DataAccessObject {
    
    constructor(type) {
        this.type = type;

        if (this.type === "cart") {
            this.dto = new CartDAO()
        } else if (this.type === "user") {
            this.dto = new UsersDAO()
        } else if (this.type === "sale") {
            this.dto = new SaleDAO()
        }

    }

}
