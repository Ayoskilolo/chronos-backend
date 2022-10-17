import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    // @Post('signup')
    // async createNewUser(
    //     @Body('name') name:string,
    //     @Body('email') email:string,
    //     @Body('password') password:string,
    // ) {
    //     const user = this.AuthService.createUser(name, email, password);
    //     return {
    //         id: (await user).id,
    //         name: (await user).name,
    //         email: (await user).email,
    //     };
    // }

    @Get('id')
    getUser(@Param('id') id:string): Promise<UserDetails | null>{
        return this.userService.findbyId(id);
    }
}
