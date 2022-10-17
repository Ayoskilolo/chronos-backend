import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './order.schema';
import { itemSchema } from './item.schema';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Order', schema: OrderSchema},
      {name: 'Item', schema: itemSchema},
      {name: 'User', schema: UserSchema}])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
