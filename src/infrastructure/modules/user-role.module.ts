import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleController } from 'src/application/controller/user-role.controller';
import { UserRoleSchema } from 'src/domain/entities/user-role.entity';
import { UserRoleService } from 'src/domain/services/user-role.service';

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
