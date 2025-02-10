import { NestHelper } from '@instance/NestHelper';
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '@service/cache.service';
import { appConfig } from 'infrastructure/config/app.config';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwt: JwtService,
        private readonly cacheService: CacheService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );
        if (!permissions) {
            return true;
        }

        const headers = context.switchToHttp().getRequest().headers;
        const au = headers.authorization;
        if (NestHelper.getInstance().isEmpty(au)) {
            throw new UnauthorizedException();
        }

        if (!au || !au.startsWith('Bearer ')) {
            throw new UnauthorizedException();
        }

        const tokenParts = au.split(' ');
        if (tokenParts.length !== 2) {
            throw new UnauthorizedException();
        }

        const token = tokenParts[1];

        try {
            this.jwt.verify(token, { secret: appConfig.jwtSecret });
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        const payload: any = this.jwt.decode(token);
        if (NestHelper.getInstance().isEmpty(payload)) {
            throw new UnauthorizedException();
        }

        const user = await this.cacheService.getGlobalCache(payload.userId);

        if (!user) {
            return false;
        }

        const userPermissions = new Set(user?.permissions.map((e) => e.name));
        const inScopes = permissions.some((perm) => userPermissions.has(perm));

        if (!inScopes) {
            throw new ForbiddenException();
        }

        return true;
    }
}
