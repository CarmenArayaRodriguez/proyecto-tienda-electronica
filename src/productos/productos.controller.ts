/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
    constructor(private productosService: ProductosService) { }

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto registrado.' })
    async registrarProducto(@Body() crearProductoDto: CrearProductoDto) {
        try {
            const producto = await this.productosService.registrarProducto(crearProductoDto);
            return producto;
        } catch (error) {
            throw new HttpException('Error al registrar producto', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos.' })
    async listaProductos() {
        try {
            const productos = await this.productosService.listarProductos();
            return productos;
        } catch (error) {
            throw new HttpException('Error al obtener la lista de productos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

