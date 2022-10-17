import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

import { UserDetails } from './user-details.interface';
// import { AuthService } from 'src/auth/auth.service';

import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

    _getUserDetails(user: UserDocument): UserDetails {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    }

    async findbyEmail(email: string): Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
    }

    async findbyId(id: string): Promise<UserDetails | null>{
        const user = await this.userModel.findById({id}).exec();
        if (!user) return null;
        return this._getUserDetails(user);
    }

    async createUser(name: string, email: string, hashedPassword: string):
    Promise<UserDocument> {
        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword,
        });

        return newUser.save()
    }
}
