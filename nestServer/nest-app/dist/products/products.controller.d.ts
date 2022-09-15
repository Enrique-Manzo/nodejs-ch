import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    findAll(): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        price: number;
    }>;
    addOne(data: string): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
}
