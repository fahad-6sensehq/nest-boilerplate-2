import { Types } from 'mongoose';
import { CreateUserDto } from 'src/application/dtos/createUser.dto';

export class ConstructObjectFromDto {
    static constructCreateUserObject(user: CreateUserDto) {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            created_by: new Types.ObjectId('67a5e8fa4467af8e733dec2a'),
            clientId: new Types.ObjectId('67a5e5444467af8e733deb9a'),
        };
    }
}
