"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products = [
    {
        id: 232131,
        name: "sofa",
        price: 120
    },
    {
        id: 565465,
        name: "desk",
        price: 300
    },
    {
        id: 90098,
        name: "chair",
        price: 50
    }
];
let ProductsService = class ProductsService {
    constructor() {
        this.products = [];
    }
    getAll() {
        return products;
    }
    getExpensive() {
        return Math.max(...products.map(p => p.price));
    }
    getCheaper() {
        return Math.min(...products.map(p => p.price));
    }
    getById(id) {
        return products.find(p => p.id == id);
    }
    postNew(product) {
        products.push(product);
        return products;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map