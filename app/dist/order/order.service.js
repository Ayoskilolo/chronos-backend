"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sgMail = require('@sendgrid/mail');
let OrderService = class OrderService {
    constructor(orderModel, itemModel, userModel) {
        this.orderModel = orderModel;
        this.itemModel = itemModel;
        this.userModel = userModel;
    }
    async createOrder(items, email) {
        let totalCost = 0;
        items.forEach((value, index) => {
            console.log(value);
            totalCost += value.price;
            console.log(value);
            console.log(items);
            items[index] = new this.itemModel(Object.assign({}, value));
            console.log(items);
        });
        console.log(items);
        const user = await this.userModel.findOne({ email });
        console.log(items);
        console.log(typeof items);
        const order = new this.orderModel({ items, cost: totalCost, attended: false, owner: user._id, });
        console.log(order);
        try {
            const result = await order.save();
            console.log(result);
            try {
                await this.sendMail(email, order.items);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException('Failed email');
            }
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException('Improper data provided.');
        }
    }
    async getAllOrders() {
        try {
            const orders = await this.orderModel.find({});
            return orders;
        }
        catch (_a) {
            throw new common_1.ServiceUnavailableException('Please try again later');
        }
    }
    async getSingleOrder(id) {
        try {
            const order = await this.orderModel.findById(id);
            if (!order)
                throw new common_1.BadRequestException('Invalid request');
            return order;
        }
        catch (_a) {
            throw new common_1.BadRequestException('Invalid request');
        }
    }
    async deleteSingleOrder(id) {
        try {
            const order = await this.orderModel.findByIdAndDelete(id);
            if (!order)
                throw new common_1.BadRequestException('Invalid request');
            return order;
        }
        catch (_a) {
            throw new common_1.BadRequestException('Invalid request');
        }
    }
    async sendMail(email, items) {
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
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Unable to send email');
        }
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __param(1, (0, mongoose_1.InjectModel)('Item')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map