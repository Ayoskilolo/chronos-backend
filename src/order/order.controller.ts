import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDocument } from './order.schema';
import { JwtGuard } from 'src/auth/guards/jwt.guard';



@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    // @UseGuards(JwtGuard)
    @Post()
    createOrder(
    @Body()
    body: {
        items: {item: string; quantity:number; price: number;}[],
        email: string,
        },
    ) { 
        // console.log(body)
        // console.log(body.items)
        return this.orderService.createOrder(body.items, body.email);
    }



    // @UseGuards(JwtGuard)
    @Get()
    async findAllOrders(): Promise<OrderDocument[]> {
        return this.orderService.getAllOrders();
    }

    @UseGuards(JwtGuard)
    @Get('id')
    findOrder(@Param('id') id: string): Promise<OrderDocument> {
        return this.orderService.getSingleOrder(id);
    }


    @Delete(':id')
    deleteOrder(@Param('id') id:string) {
        return this.orderService.deleteSingleOrder(id);
    }
}
