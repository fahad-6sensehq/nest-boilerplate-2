import { CreateClientDto } from '@dto/create-client.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from '@service/client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClient(@Body() client: CreateClientDto) {
        return this.clientService.createClient(client);
    }
}
