import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, @InjectModel('User') private readonly userModel: Model<UserDocument>) {} 

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 12);
    }

    async register(user: Readonly<NewUserDTO>):Promise<UserDetails | any > {
        const { name, email, password} = user;

        const existingUser =  await this.userService.findbyEmail(email);

        if (existingUser) return 'Email taken!';

        const hashedPasword= await this.hashPassword(password);

        const newUser = await this.userService.createUser(name, email, hashedPasword);

        return this.userService._getUserDetails(newUser);
    }


    async doesPasswordMatch(password: string, hashedPasword: string):
    Promise<boolean>{
        return bcrypt.compare(password, hashedPasword);
    }

    async validateUser(email: string, password: string):
    Promise<UserDetails | null>{
        const user = await this.userService.findbyEmail(email);
        const doesUserExist = !!user;

        if (!doesUserExist) return null;

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if (!doesUserExist) return null;

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDTO,): Promise< {token: string, user: {id: string, name: string, email: string}} | null>{
        const {email, password } = existingUser;
        const user = await this.validateUser(email, password);

        if (!user) return null;

        const jwt = await this.jwtService.signAsync({ user });
        return {token: jwt, user};
    }

    //TODO: find jwt in my code
}
