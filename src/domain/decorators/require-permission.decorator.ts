import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from './permissions.decorator';
import { RolesGuard } from '../guards/role.guard';

export function RequirePermissions(...permissions: string[]):
    <TFunction extends Function, Y>(
        target: object | TFunction,
        propertyKey?: string | symbol,
        descriptor?: TypedPropertyDescriptor<Y>
    ) => void {
    return applyDecorators(
        Permissions(...permissions),
        UseGuards(AuthGuard('jwt'), RolesGuard)
    );
}
