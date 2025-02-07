import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UserRoleService } from '../../domain/services/user-role.service';
import { CreateUserRoleDto } from '../dtos/create-user-role.dto';
import { UpdateUserRoleDto } from '../dtos/update-user-role.dto';

@Controller('user-role')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) {}

    @Post()
    create(@Body() createUserRoleDto: CreateUserRoleDto) {
        return this.userRoleService.create(createUserRoleDto);
    }

    @Get()
    findAll() {
        return this.userRoleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userRoleService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserRoleDto: UpdateUserRoleDto,
    ) {
        return this.userRoleService.update(+id, updateUserRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userRoleService.remove(+id);
    }
}
