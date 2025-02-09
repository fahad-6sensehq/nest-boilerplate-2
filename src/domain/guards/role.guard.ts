import { CanActivate, ExecutionContext, ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { appConfig } from "src/infrastructure/config/app.config";
import { ExceptionHelper } from "../instances/ExceptionHelper";
import { NestHelper } from "../instances/NestHelper";
import { UserService } from "../services/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwt: JwtService,
        private userService: UserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!permissions) {
            return true;
        }

        const headers = context.switchToHttp().getRequest().headers;
        const au = headers.authorization;
        if (NestHelper.getInstance().isEmpty(au)) {
            throw new UnauthorizedException()
        }

        const token = au.split('Bearer ');
        try {
            this.jwt.verify(token[1], { secret: appConfig.jwtSecret });
        } catch (err) {
            ExceptionHelper.getInstance().defaultError('Unauthorized', 'unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const payload: any = this.jwt.decode(token[1]);
        if (NestHelper.getInstance().isEmpty(payload)) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.find(payload?.userId);
        if (!user) {
            return false;
        }
        const userPermissions = user?.permissions.map((e) => {
            return e.name;
        });

        const inScopes = permissions.some((elem) => {
            return userPermissions.includes(elem);
        });

        if (!inScopes) {
            throw new ForbiddenException();
        }
        return true;
    }
}
