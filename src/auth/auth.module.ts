import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Mongoose } from 'mongoose';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'User', schema: UserSchema}
  ]),
    UserModule, JwtModule.registerAsync({
    useFactory: function () {
      return {
        secret: 'secret',
        signOptions: {expiresIn: '3600s'}
      }
    },
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard,JwtStrategy]
})
export class AuthModule {}
