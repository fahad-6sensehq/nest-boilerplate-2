import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from 'src/domain/services/client.service';
import { CreateClientDto } from '../dtos/createClient.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClient(@Body() client: CreateClientDto) {
        return this.clientService.createClient(client);
    }
}
