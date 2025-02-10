import { CreateUserDto } from '@dto/create-user.dto';
import { Types } from 'mongoose';

export class ConstructObjectFromDto {
    static constructCreateUserObject(user: CreateUserDto) {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            created_by: new Types.ObjectId('67a78165d5201ab4c8c13206'),
            clientId: new Types.ObjectId('67a78165d5201ab4c8c13206'),
        };
    }
}
