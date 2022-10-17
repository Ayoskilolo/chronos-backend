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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AuthService = class AuthService {
    constructor(userService, jwtService, userModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
    async register(user) {
        const { name, email, password } = user;
        const existingUser = await this.userService.findbyEmail(email);
        if (existingUser)
            return 'Email taken!';
        const hashedPasword = await this.hashPassword(password);
        const newUser = await this.userService.createUser(name, email, hashedPasword);
        return this.userService._getUserDetails(newUser);
    }
    async doesPasswordMatch(password, hashedPasword) {
        return bcrypt.compare(password, hashedPasword);
    }
    async validateUser(email, password) {
        const user = await this.userService.findbyEmail(email);
        const doesUserExist = !!user;
        if (!doesUserExist)
            return null;
        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);
        if (!doesUserExist)
            return null;
        return this.userService._getUserDetails(user);
    }
    async login(existingUser) {
        const { email, password } = existingUser;
        const user = await this.validateUser(email, password);
        if (!user)
            return null;
        const jwt = await this.jwtService.signAsync({ user });
        return { token: jwt, user };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService, mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map