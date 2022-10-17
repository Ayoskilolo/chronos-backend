import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {Document} from 'mongoose';
import { User } from "src/user/user.schema";
import { Item } from "./item.schema";

export type OrderDocument = Order & Document;

@Schema()
export class Order{
    @Prop({required: true})
    items: Item[];

    @Prop({required: true})
    cost:number;

    @Prop({fault: false})
    attended: boolean

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: User;

}

export const OrderSchema = SchemaFactory.createForClass(Order);


// validate(value: number) {
//     if (value < 0)
//       throw new BadRequestException(' Total cannot be less than 0');
//   },