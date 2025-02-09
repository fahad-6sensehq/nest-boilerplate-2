import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from 'src/domain/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        // @Inject(CACHE_MANAGER)
        // private readonly cache: Cache
    ) { }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    // @Get('test')
    // async testCache() {
    //     await this.cache.set('testkey', 'testvalue');
    //     const value = await this.cache.get('testkey');
    //     return { value };
    // }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.userService.find(id);
    }
}
