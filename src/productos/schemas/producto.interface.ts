/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Producto extends Document {
    nombre: string;
    categoria: string;
    precioUnitario: number;
}
