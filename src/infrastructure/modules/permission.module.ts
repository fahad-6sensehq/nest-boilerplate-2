import { PermissionController } from '@controller/permission.controller';
import { PermissionSchema } from '@entity/permission.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionService } from '@service/permission.service';

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
