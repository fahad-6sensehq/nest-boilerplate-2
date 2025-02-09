import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/domain/services/auth.service';
import { ClientCredentialsGuard } from 'src/domain/guards/clientAuthentication.guard';
import { Request, Response } from 'express';
import { RequirePermissions } from 'src/domain/decorators/require-permission.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/domain/decorators/getUser.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(ClientCredentialsGuard)
    async login(@Req() req: Request, @Res() res: Response) {
        return this.authService.login(req, res);
    }

    @Get('is-authenticated-by-permissions')
    @RequirePermissions('user.view')
    async isAuthenticated() {
        return { message: 'Authenticated' };
    }

    @Get('is-authenticated-by-jwt')
    @UseGuards(AuthGuard('jwt'))
    async isAuthenticatedByJwt(@GetUser() user: any) {
        return user;
    }
}
