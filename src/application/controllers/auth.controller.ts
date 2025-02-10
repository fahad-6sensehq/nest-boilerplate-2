import { GetUser } from '@decorator/getUser.decorator';
import { RequirePermissions } from '@decorator/require-permission.decorator';
import { ClientCredentialsGuard } from '@guard/clientAuthentication.guard';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@service/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
