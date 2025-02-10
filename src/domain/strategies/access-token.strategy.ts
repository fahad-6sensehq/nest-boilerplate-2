import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CacheService } from '@service/cache.service';
import { appConfig } from 'infrastructure/config/app.config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly cacheService: CacheService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig.jwtSecret,
        });
    }

    async validate(payload: any) {
        const user = await this.cacheService.getGlobalCache(payload.userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            userId: payload.userId,
            email: user.email,
            role: user.role,
            name: user.name,
            clientId: user.clientId,
        };
    }
}
