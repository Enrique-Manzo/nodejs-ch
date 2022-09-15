export declare class ProductsService {
    private readonly products;
    getAll(): {
        id: number;
        name: string;
        price: number;
    }[];
    getExpensive(): number;
    getCheaper(): number;
    getById(id: any): {
        id: number;
        name: string;
        price: number;
    };
    postNew(product: any): {
        id: number;
        name: string;
        price: number;
    }[];
}
