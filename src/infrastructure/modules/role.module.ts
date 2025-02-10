import { RoleController } from '@controller/role.controller';
import { RoleSchema } from '@entity/role.entity';
import { PermissionModule } from '@module/permission.module';
import { RolePermissionModule } from '@module/role-permission.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from '@service/role.service';

@Module({
    imports: [
        PermissionModule,
        RolePermissionModule,
        MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
