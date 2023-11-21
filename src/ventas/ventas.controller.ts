/* eslint-disable prettier/prettier */
import { Controller, Get, Res, HttpStatus, Body, Post, HttpException } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { Response } from 'express';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ventas')
@Controller('ventas')
export class VentasController {
    constructor(private ventasService: VentasService) { }

    @Post()
    @ApiOperation({ summary: 'Registrar una nueva venta' })
    @ApiResponse({ status: 201, description: 'Venta registrada.' })
    async registrarVenta(@Body() crearVentaDto: CrearVentaDto) {
        try {
            const venta = await this.ventasService.registrarVenta(crearVentaDto);
            return venta;
        } catch (error) {
            throw new HttpException('Error al registrar la venta', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas las ventas' })
    @ApiResponse({ status: 200, description: 'Lista de ventas.' })
    async listaVentas() {
        try {
            const ventas = await this.ventasService.listarVentas();
            return ventas;
        } catch (error) {
            throw new HttpException('Error al listar las ventas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('reporte-categorias')
    @ApiOperation({ summary: 'Reporte de ventas por categoría' })
    @ApiResponse({ status: 200, description: 'Reporte de ventas por categoría.' })
    async obtenerReporteCategorias(@Res() res: Response) {
        try {
            const reporte = await this.ventasService.reporteCategorias();
            res.status(HttpStatus.OK).json(reporte);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}
