/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './schemas/producto.interface';
import { CrearProductoDto } from './dto/crear-producto.dto';

@Injectable()
export class ProductosService {
    constructor(@InjectModel('Producto') private productoModel: Model<Producto>) { }

    async registrarProducto(crearProductoDto: CrearProductoDto): Promise<Producto> {
        try {
            const nuevoProducto = new this.productoModel(crearProductoDto);
            return nuevoProducto.save();
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            throw new Error('Error al registrar el producto');
        }
    }

    async listarProductos(): Promise<Producto[]> {
        try {
            return this.productoModel.find().exec();
        } catch (error) {
            console.error('Error al listar los productos:', error);
            throw new Error('Error al listar los productos');
        }
    }
}
