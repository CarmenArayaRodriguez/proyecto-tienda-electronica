/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const VentaSchema = new mongoose.Schema({
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    },
    cantidad: Number,
    precioTotal: Number,
    fechaVenta: Date,
    vendedor: String
}, {
    versionKey: false
});

