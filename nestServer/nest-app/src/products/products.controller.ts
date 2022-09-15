import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {}

    @Get()
    async findAll() {
      return await this.ProductsService.getAll()  
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.ProductsService.getById(parseInt(id));
    }

    @Post()
    async addOne(@Body() data: string) {
        return await this.ProductsService.postNew(data);
    }

}
