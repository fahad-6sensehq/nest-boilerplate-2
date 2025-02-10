import { UserController } from '@controller/user.controller';
import { UserSchema } from '@entity/user.entity';
import { RoleModule } from '@module/role.module';
import { UserRoleModule } from '@module/user-role.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '@service/user.service';

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
export class UserModule {}
