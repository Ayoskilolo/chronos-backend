import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly userModel;
    constructor(userService: UserService, jwtService: JwtService, userModel: Model<UserDocument>);
    hashPassword(password: string): Promise<string>;
    register(user: Readonly<NewUserDTO>): Promise<UserDetails | any>;
    doesPasswordMatch(password: string, hashedPasword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<UserDetails | null>;
    login(existingUser: ExistingUserDTO): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
        };
    } | null>;
}
