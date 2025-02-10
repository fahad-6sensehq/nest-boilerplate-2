import { ClientController } from '@controller/client.controller';
import { Client, ClientSchema } from '@entity/client.entity';
import { RoleModule } from '@module/role.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientService } from '@service/client.service';

@Module({
    imports: [
        RoleModule,
        MongooseModule.forFeature([
            { name: Client.name, schema: ClientSchema },
        ]),
    ],
    providers: [ClientService],
    controllers: [ClientController],
    exports: [ClientService],
})
export class ClientModule {}
