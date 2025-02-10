import { Timer } from '@constant/timer.constants';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cache: Cache,
        private readonly userService: UserService,
    ) {}

    async getGlobalCache(id: string): Promise<any> {
        const key = `global:user:${id}`;
        let user = await this.cache.get(key);

        if (user) {
            console.log('get from cache');
            return user;
        }

        user = await this.userService.find(id);

        if (!user) return null;

        await this.cache.set(key, user, Timer.DAY);

        return user;
    }

    async get(key: string): Promise<any> {
        return await this.cache.get(key);
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cache.set(key, value, ttl);
    }

    async invalidateUserCache(id: string): Promise<void> {
        const key = `global:user:${id}`;
        await this.cache.del(key);
    }

    async delete(key: string): Promise<void> {
        await this.cache.del(key);
    }
}
