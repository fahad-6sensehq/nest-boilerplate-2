import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExceptionHelper } from 'src/domain/instances/ExceptionHelper';
import { RolePermissions } from 'src/domain/rolePermissions';
import { CreateClientDto } from '../../application/dtos/createClient.dto';
import { Client, ClientDocument } from '../entities/client.entity';
import { RoleService } from './role.service';

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
}
