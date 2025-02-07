import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermissionController } from 'src/application/controller/role-permission.controller';
import { RolePermissionSchema } from 'src/domain/entities/role-permission.entity';
import { RolePermissionService } from 'src/domain/services/role-permission.service';

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
