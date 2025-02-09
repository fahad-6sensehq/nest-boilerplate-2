import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from 'src/application/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from 'src/infrastructure/config/app.config';
import { Request, Response } from 'express';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(req: Request, res: Response): Promise<Response> {
        const loginDto = req.body as LoginDto;
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) {
            return res.json({ response: 'User not found' });
        }

        if (user.password !== loginDto.password) {
            return res.json({ response: 'Password didn\'t match' });
        }

        const userWithPermission = await this.userService.find(user._id.toString());
        const scopes = userWithPermission.permissions.map((permission) => permission.name);

        const { accessToken, refreshToken } = await this.generateToken(userWithPermission);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: appConfig.serverType === 'prod',
            sameSite: appConfig.serverType === 'prod' ? 'strict' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: appConfig.serverType === 'prod',
            sameSite: appConfig.serverType === 'prod' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            ...user, scopes: [...scopes],
        });
    }

    async generateToken(user): Promise<{ accessToken: string; refreshToken: string }> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(
                {
                    userId: user._id,
                },
                {
                    secret: appConfig.jwtSecret,
                    expiresIn: 3600,
                }
            ),
            this.jwtService.sign(
                {
                    userId: user._id,
                },
                {
                    secret: appConfig.jwtSecret,
                    expiresIn: 3600 * 24 * 7,
                }
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async isAuthenticatedByJwt(user: any): Promise<any> {
        return await this.userService.find(user.userId);
    }
}
