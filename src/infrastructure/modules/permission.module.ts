import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from 'src/application/controller/permission.controller';
import { PermissionSchema } from 'src/domain/entities/permission.entity';
import { PermissionService } from 'src/domain/services/permission.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Permission', schema: PermissionSchema },
        ]),
    ],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService],
})
export class PermissionModule {}
