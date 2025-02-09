import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/application/controller/user.controller';
import { UserService } from 'src/domain/services/user.service';
import { UserSchema } from '../../domain/entities/user.entity';
import { UserRoleModule } from './user-role.module';
import { RoleModule } from './role.module';

@Module({
    imports: [
        UserRoleModule,
        RoleModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
