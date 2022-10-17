import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { Model } from 'mongoose';
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}