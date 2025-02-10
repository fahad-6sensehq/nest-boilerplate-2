import { Timer } from '@constant/timer.constants';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@service/user.service';
import { appConfig } from 'infrastructure/config/app.config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER)
        private readonly cache: Cache,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig.jwtSecret,
        });
    }

    async validate(payload: any) {
        const key = `global:user:${payload.userId}`;
        const cachedUser = await this.cache.get(key);
        let user;

        if (cachedUser) {
            console.log('from jwt cache');
            user = cachedUser;
        } else {
            user = await this.userService.find(payload.userId);
            await this.cache.set(key, user, Timer.DAY);
        }

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
