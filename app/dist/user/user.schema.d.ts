import mongoose, { Document } from 'mongoose';
import { Item } from 'src/order/item.schema';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    orders: Item[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
