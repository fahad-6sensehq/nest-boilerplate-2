import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { RolePermissionService } from '../../domain/services/role-permission.service';
import { CreateRolePermissionDto } from '../dtos/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dtos/update-role-permission.dto';

@Controller('role-permission')
export class RolePermissionController {
    constructor(
        private readonly rolePermissionService: RolePermissionService,
    ) {}

    @Post()
    create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
        return this.rolePermissionService.create(createRolePermissionDto);
    }

    @Get()
    findAll() {
        return this.rolePermissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolePermissionService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRolePermissionDto: UpdateRolePermissionDto,
    ) {
        return this.rolePermissionService.update(+id, updateRolePermissionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolePermissionService.remove(+id);
    }
}
