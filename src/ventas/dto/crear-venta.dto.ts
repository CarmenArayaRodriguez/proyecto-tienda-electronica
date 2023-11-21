/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CrearVentaDto {
    @ApiProperty({ example: '5fcb6d9f72d3fb381b101ce1', description: 'ID del producto vendido' })
    readonly productoId: string;

    @ApiProperty({ example: 1600000, description: 'Precio total de la venta' })
    readonly precioTotal: number;

    @ApiProperty({ example: 2, description: 'Cantidad del producto vendido' })
    readonly cantidad: number;

    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del vendedor' })
    readonly vendedor: string;
}
