import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/createUser.dto';
import { UserService } from 'src/domain/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.userService.find(id);
    }
}
