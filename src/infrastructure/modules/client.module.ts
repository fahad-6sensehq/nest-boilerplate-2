import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from 'src/application/controller/client.controller';
import { Client, ClientSchema } from 'src/domain/entities/client.entity';
import { ClientService } from 'src/domain/services/client.service';
import { RoleModule } from './role.module';

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
