import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose'
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import {ConfigModule} from '@nestjs/config';
require('dotenv').config()

const name = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const dbname = process.env.DATABASE_NAME;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${name}:${password}@ayoskilolo-cluster.jbphaan.mongodb.net/${dbname}?retryWrites=true&w=majority`),
    OrderModule, 
    UserModule, 
    AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
