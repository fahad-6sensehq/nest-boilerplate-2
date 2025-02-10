import { Permissions } from '@decorator/permissions.decorator';
import { PermissionGuard } from '@guard/permission.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function RequirePermissions(
    ...permissions: string[]
): <TFunction extends Function, Y>(
    target: object | TFunction,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<Y>,
) => void {
    return applyDecorators(
        Permissions(...permissions),
        UseGuards(PermissionGuard),
    );
}
