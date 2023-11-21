/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precioUnitario: Number
}, {
    versionKey: false
});
