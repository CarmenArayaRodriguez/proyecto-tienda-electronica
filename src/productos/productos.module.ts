/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { ProductoSchema } from './schemas/producto. schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }])
    ],
    controllers: [ProductosController],
    providers: [ProductosService],
})
export class ProductosModule { }
