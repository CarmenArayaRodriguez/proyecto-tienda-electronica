/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CrearProductoDto {
    @ApiProperty({ example: 'iPhone 13', description: 'Nombre del producto' })
    readonly nombre: string;

    @ApiProperty({ example: 'Teléfonos', description: 'Categoría del producto' })
    readonly categoria: string;

    @ApiProperty({ example: 800000, description: 'Precio unitario del producto' })
    readonly precioUnitario: number;
}
