import { BadRequestException, Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { ItemDocument } from './item.schema';
import { OrderDocument } from './order.schema';
const sgMail = require('@sendgrid/mail');


@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') 
        private readonly orderModel: Model<OrderDocument>,
        @InjectModel('Item') 
        private readonly itemModel: Model<ItemDocument>,
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>) {}

    async createOrder(
        items: {item:string, quantity: number, price: number}[],
        email: string,
        ) {
            // console.log(items)
            let totalCost = 0;

            items.forEach((value,index) => {
                console.log(value)
                totalCost += value.price;
                console.log(value)
                console.log(items)
                items[index] = new this.itemModel({ ...value});
                console.log(items)
            });

            console.log(items)

            const user = await this.userModel.findOne({email});
            console.log(items)
            console.log(typeof items)
            const order = new this.orderModel({items, cost:totalCost, attended: false, owner: user._id,})
            console.log(order)

            try {
                const result = await order.save();
                console.log(result)
                try {
                    await this.sendMail(email, order.items);
                } catch (e) {
                    throw new InternalServerErrorException('Failed email');
                }

                return result;
            } catch (e) {
                throw new BadRequestException('Improper data provided.')
            }
        }

    async getAllOrders() {
        try {
            const orders = await this.orderModel.find({});
            return orders;
        } catch {
            throw new ServiceUnavailableException('Please try again later');
        }
    }
        
    async getSingleOrder(id: string) {
        try {
            const order = await this.orderModel.findById(id);
            if (!order) throw new BadRequestException('Invalid request');
            return order;
        } catch {
            throw new BadRequestException('Invalid request');
        }
    }
        
    async deleteSingleOrder(id: string) {
        try {
            const order = await this.orderModel.findByIdAndDelete(id);
            if (!order) throw new BadRequestException('Invalid request');
            return order;
        } catch {
            throw new BadRequestException('Invalid request');
        }
    }
        
    async sendMail(
        email: string,
        items: { item: string; quantity: number; price: number }[],
    ) {
        const itemNames = items.map((v) => v.item);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log(' I ran');
        const msg = {
            to: `${email}`,
            from: process.env.EMAIL,
            subject: 'Order Confirmation',
            text: `Thank you for shopping with Le Magasin. If your order is incorrect or it wasn't you that ordered, please reply to this email.
            \nDetails of your order include: ${itemNames.join(', ')}`,
        };
        try {
            await sgMail.send(msg);
        } catch (e) {
            throw new InternalServerErrorException('Unable to send email');
        }
    }
}


        
    // async updateOrder(
    // id: string,
    // newName: string,
    // newPrice: number,
    // newDescription: string,
    // ): Promise<OrderDocument> {
    //     let existingOrder = await this.find(id);

    //     existingOrder.name = newName ?? existingOrder.name;
    //     existingOrder.price = newPrice ?? existingOrder.price;
    //     existingOrder.description = newDescription ?? existingOrder.description;

    //     return existingOrder.save();
    // }
        
    // async delete(id: string) {
    //     return this.orderModel.deleteOne({ _id: id }).exec();
    // }