/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { VentaSchema } from './schemas/venta.schema';
import { ProductoSchema } from 'src/productos/schemas/producto. schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Venta', schema: VentaSchema },
        { name: 'Producto', schema: ProductoSchema }
        ])
    ],
    controllers: [VentasController],
    providers: [VentasService],
})
export class VentasModule { }
