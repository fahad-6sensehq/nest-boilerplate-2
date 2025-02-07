import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from '../../application/controller/role.controller';
import { RoleSchema } from '../../domain/entities/role.entity';
import { RoleService } from '../../domain/services/role.service';
import { PermissionModule } from './permission.module';
import { RolePermissionModule } from './role-permission.module';

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
