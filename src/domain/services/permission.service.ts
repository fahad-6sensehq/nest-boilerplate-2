import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from '../../application/dtos/create-permission.dto';
import { Permission, PermissionDocument } from '../entities/permission.entity';
import { UpdatePermissionDto } from 'src/application/dtos/update-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Permission.name)
        private readonly permissionModel: Model<PermissionDocument>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto) {
        return await this.permissionModel.create(createPermissionDto);
    }

    async findAll() {
        return await this.permissionModel.find().exec();
    }

    async findByName(name: string) {
        return this.permissionModel.findOne({ name });
    }

    findOne(id: number) {
        return `This action returns a #${id} permission`;
    }

    update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return `This action updates a #${id} permission`;
    }

    remove(id: number) {
        return `This action removes a #${id} permission`;
    }
}
