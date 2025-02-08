import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/domain/services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { ClientCredentialsGuard } from 'src/domain/guards/clientAuthentication.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(ClientCredentialsGuard)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
}
