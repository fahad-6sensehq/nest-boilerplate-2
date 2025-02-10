import { RolePermissionController } from '@controller/role-permission.controller';
import { RolePermissionSchema } from '@entity/role-permission.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermissionService } from '@service/role-permission.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'RolePermission', schema: RolePermissionSchema },
        ]),
    ],
    controllers: [RolePermissionController],
    providers: [RolePermissionService],
    exports: [RolePermissionService],
})
export class RolePermissionModule {}
