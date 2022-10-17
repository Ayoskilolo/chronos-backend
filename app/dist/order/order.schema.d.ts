import mongoose, { Document } from 'mongoose';
import { User } from "src/user/user.schema";
import { Item } from "./item.schema";
export declare type OrderDocument = Order & Document;
export declare class Order {
    items: Item[];
    cost: number;
    attended: boolean;
    owner: User;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, any>, {}, {}, {}, {}, "type", Order>;
