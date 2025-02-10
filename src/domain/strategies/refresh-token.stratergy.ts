import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@service/user.service';
import { appConfig } from 'infrastructure/config/app.config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(private readonly userService: UserService) {
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
