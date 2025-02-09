import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { appConfig } from 'src/infrastructure/config/app.config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../services/user.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Timer } from '../constants/timer.constants';

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
            console.log('from cache 2');
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
