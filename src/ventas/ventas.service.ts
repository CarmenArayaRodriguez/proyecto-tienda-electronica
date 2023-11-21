/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Venta } from "./schemas/venta.interface";
import { CrearVentaDto } from "./dto/crear-venta.dto";
import { Producto } from "src/productos/schemas/producto.interface";

@Injectable()
export class VentasService {
    constructor(@InjectModel('Venta') private ventaModel: Model<Venta>,
        @InjectModel('Producto') private productoModel: Model<Producto>
    ) { }

    async registrarVenta(crearVentaDto: CrearVentaDto): Promise<Venta> {
        try {
            console.log('Registrando venta:', crearVentaDto);

            if (!mongoose.Types.ObjectId.isValid(crearVentaDto.productoId)) {
                throw new Error('productoId inválido');
            }

            const productoExiste = await this.productoModel.findById(crearVentaDto.productoId).exec();
            if (!productoExiste) {
                throw new Error('El producto no existe');
            }

            const nuevaVenta = new this.ventaModel({
                ...crearVentaDto,
                fechaVenta: new Date()
            });

            const ventaGuardada = await nuevaVenta.save();
            console.log('Venta registrada con éxito:', ventaGuardada);
            return ventaGuardada;
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            throw error;
        }
    }

    async listarVentas(): Promise<Venta[]> {
        return this.ventaModel.find().exec();
    }

    async reporteCategorias(): Promise<any> {
        console.log('Iniciando generación del reporte de categorías');
        const reporte = await this.ventaModel.aggregate([
            {
                $match: {
                    fechaVenta: {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            },
            {
                $lookup: {
                    from: "productos",
                    localField: "productoId",
                    foreignField: "_id",
                    as: "producto_info"
                }
            },
            {
                $unwind: "$producto_info"
            },
            {
                $group: {
                    _id: "$producto_info.categoria",
                    totalIngresos: { $sum: "$precioTotal" }
                }
            },
            {
                $project: {
                    _id: 0,
                    categoria: "$_id",
                    totalIngresos: 1
                }
            }
        ]);
        console.log('Datos procesados en la consulta de agregación:', reporte);

        const mesActual = new Date().getMonth() + 1;
        const añoActual = new Date().getFullYear();

        console.log(`Generando reporte para el mes: ${mesActual}, año: ${añoActual}`);

        const resultado = {
            mes: mesActual,
            año: añoActual,
            datos: reporte
        };


        console.log('Reporte generado:', resultado);

        return resultado;
    } catch(error) {
        console.error('Error al generar el reporte de categorías:', error);
        throw error;
    }
}
