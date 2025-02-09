import { Injectable, UnauthorizedException } from '@nestjs/common';
import { appConfig } from 'src/infrastructure/config/app.config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../services/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.jwtSecret,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.find(payload.userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
            name: user.name,
            clientId: user.clientId,
        };
    }
}