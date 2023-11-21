/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentasModule } from './ventas/ventas.module';
import { ProductosModule } from './productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:clave123@localhost:27018/tienda_electronica', {
    }),
    ProductosModule, VentasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
