import { UserRoleController } from '@controller/user-role.controller';
import { UserRoleSchema } from '@entity/user-role.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleService } from '@service/user-role.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'UserRole', schema: UserRoleSchema },
        ]),
    ],
    controllers: [UserRoleController],
    providers: [UserRoleService],
    exports: [UserRoleService],
})
export class UserRoleModule {}
