import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../entities/role.entity';
import { PermissionService } from './permission.service';
import { RolePermissionService } from './role-permission.service';
import { CreateRoleDto } from 'src/application/dtos/create-role.dto';
import { UpdateRoleDto } from 'src/application/dtos/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
        private readonly permissionService: PermissionService,
        private readonly rolePermissionService: RolePermissionService,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        return await this.roleModel.create(createRoleDto);
    }

    async findByName(role: string) {
        return await this.roleModel.findOne({ name: role });
    }

    findAll() {
        return `This action returns all role`;
    }

    findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    async createRolesAndAddPermission(name: string, permission: string[]) {
        const roleExists = await this.roleModel.find({ name });
        let role;
        if (roleExists.length === 0) {
            role = await this.roleModel.create({ name, status: 'active' });
        } else {
            role = roleExists[0];
        }
        return await this.assignPermissionToRole(role._id, permission);
    }

    async assignPermissionToRole(roleId: string, permission: string[]) {
        for (const perm of permission) {
            let permissionObj = await this.permissionService.findByName(perm);
            if (!permissionObj) {
                permissionObj = await this.permissionService.create({
                    name: perm,
                });
            }
            await this.rolePermissionService.create({
                roleId: roleId.toString(),
                permissionId: permissionObj._id.toString(),
            });
        }
        return;
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }
}
