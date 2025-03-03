import { CreateClientDto } from '@dto/create-client.dto';
import { Client, ClientDocument } from '@entity/client.entity';
import { ExceptionHelper } from '@instance/ExceptionHelper';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleService } from '@service/role.service';
import { RolePermissions } from 'domain/rolePermissions';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<ClientDocument>,
        private readonly roleService: RoleService,
    ) {}

    async createClient(clientData: CreateClientDto) {
        const secret = 'secret';
        const clientObj = {
            ...clientData,
            secret,
        };

        try {
            const client = await this.clientModel.create(clientObj);
            const rolePermissions = RolePermissions();
            for (const role of rolePermissions) {
                await this.roleService.createRolesAndAddPermission(
                    role.name,
                    role.permissions,
                );
            }

            return client;
        } catch (err) {
            ExceptionHelper.getInstance().defaultError(
                err?.message,
                'something went wrong',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async validateClientCredentials(clientId: string, clientSecret: string) {
        try {
            const client = await this.clientModel.findById(clientId).lean();
            if (client && client?.secret === clientSecret) {
                return client;
            }
        } catch {
            return null;
        }
    }
}
