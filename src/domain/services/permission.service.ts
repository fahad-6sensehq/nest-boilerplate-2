import { CreatePermissionDto } from '@dto/create-permission.dto';
import { UpdatePermissionDto } from '@dto/update-permission.dto';
import { Permission, PermissionDocument } from '@entity/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
