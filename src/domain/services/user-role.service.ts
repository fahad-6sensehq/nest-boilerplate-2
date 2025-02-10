import { CreateUserRoleDto } from '@dto/create-user-role.dto';
import { UpdateUserRoleDto } from '@dto/update-user-role.dto';
import { UserRole, UserRoleDocument } from '@entity/user-role.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectModel(UserRole.name)
        private readonly userRoleModel: Model<UserRoleDocument>,
    ) {}

    async create(createUserRoleDto: CreateUserRoleDto) {
        return await this.userRoleModel.create(createUserRoleDto);
    }

    findAll() {
        return `This action returns all userRole`;
    }

    findOne(id: number) {
        return `This action returns a #${id} userRole`;
    }

    update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
        return `This action updates a #${id} userRole`;
    }

    remove(id: number) {
        return `This action removes a #${id} userRole`;
    }
}
