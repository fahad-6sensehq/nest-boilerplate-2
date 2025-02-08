import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from 'src/application/dtos/login.dto';
import { ExceptionHelper } from '../instances/ExceptionHelper';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== loginDto.password) {
            return 'Password didn\'t match';
        }

        return user;
    }
}
