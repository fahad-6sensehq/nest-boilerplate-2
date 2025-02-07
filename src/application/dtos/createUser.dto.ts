import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidEmail } from 'src/domain/validators/isValidEmail.validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsValidEmail({ message: 'Invalid email' })
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}
