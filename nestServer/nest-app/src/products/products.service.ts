import { Injectable } from '@nestjs/common';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { Product } from './Product';

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
]

@Injectable()
export class ProductsService {
    private readonly products: Product[] = [];

    getAll() {
        return products
    }

    getExpensive() {
        return Math.max(...products.map(p => p.price))
    }

    getCheaper() {
        return Math.min(...products.map(p => p.price))
    }

    getById(id) {
        return products.find(p => p.id == id)
    }

    postNew(product) {
        products.push(product);

        return products
    }

}
