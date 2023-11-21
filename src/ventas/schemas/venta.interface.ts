/* eslint-disable prettier/prettier */
import { Document, ObjectId } from 'mongoose';

export interface Venta extends Document {
    producto: ObjectId;
    cantidad: number;
    precioTotal: number;
    fechaVenta: Date;
    vendedor: string;
}
