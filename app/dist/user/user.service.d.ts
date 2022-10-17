import { UserDocument } from './user.schema';
import { UserDetails } from './user-details.interface';
import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    _getUserDetails(user: UserDocument): UserDetails;
    findbyEmail(email: string): Promise<UserDocument | null>;
    findbyId(id: string): Promise<UserDetails | null>;
    createUser(name: string, email: string, hashedPassword: string): Promise<UserDocument>;
}
