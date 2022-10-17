import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/order/order.schema';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';


@Module({
  imports: [MongooseModule.forFeature([
    {name: 'User', schema: UserSchema},
    {name: 'Order', schema: OrderSchema},
])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
