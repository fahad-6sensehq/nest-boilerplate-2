import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { CreateUserDto } from '../../application/dtos/createUser.dto';
import { RoleService } from '../../domain/services/role.service';
import { User, UserDocument } from '../entities/user.entity';
import { ConstructObjectFromDto } from '../instances/constructObjectFromDTO';
import { ExceptionHelper } from '../instances/ExceptionHelper';
import { UserRoleService } from './user-role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        private readonly userRoleService: UserRoleService,
        private readonly roleService: RoleService,
    ) {}

    async create(body: CreateUserDto) {
        const userExists = await this.userModel.findOne({ email: body.email }).lean();
        if (userExists) {
            return ExceptionHelper.getInstance().defaultError(
                'User already exists',
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const roleService = await this.roleService.findByName(body.role);

        if (!roleService) {
            return ExceptionHelper.getInstance().defaultError(
                'Role does not exist',
                'Role does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const userObj = ConstructObjectFromDto.constructCreateUserObject(body);

        const user = await this.userModel.create(userObj);
        const userRole = await this.userRoleService.create({
            userId: user._id.toString(),
            roleId: roleService._id.toString(),
        });

        return await this.userModel
            .findByIdAndUpdate(
                user._id,
                { userRoleId: userRole._id },
                { new: true },
            )
            .select('-password')
            .exec();
    }

    async findAll() {
        return await this.userModel.find().select('-password').exec();
    }

    async findOneData(id: string): Promise<any> {
        const objId = new Types.ObjectId(id);

        const aggregate: PipelineStage[] = [];
        aggregate.push({
            $match: {
                _id: objId,
            },
        });
        aggregate.push({
            $lookup: {
                from: 'userroles',
                localField: 'userRoleId',
                foreignField: '_id',
                as: 'userRole',
            },
        });
        aggregate.push({
            $unwind: { path: '$userRole', preserveNullAndEmptyArrays: true },
        });
        aggregate.push({
            $lookup: {
                from: 'rolepermissions',
                localField: 'userRole.roleId',
                foreignField: 'roleId',
                as: 'userRole.rolePermissions',
            },
        });
        aggregate.push({
            $lookup: {
                from: 'permissions',
                localField: 'userRole.rolePermissions.permissionId',
                foreignField: '_id',
                as: 'permissions',
            },
        });

        const res = await this.userModel.aggregate(aggregate).exec();
        if (!res.length) return null;

        const { userRole, permissions, ...userInfo } = res[0];

        return {
            ...userInfo,
            permissions: permissions || [],
        };
    }

    async find(id: string) {
        return await this.findOneData(id);
    }
}
