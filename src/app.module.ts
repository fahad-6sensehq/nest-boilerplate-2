import { createKeyv } from '@keyv/redis';
import { AuthModule } from '@module/auth.module';
import { ClientModule } from '@module/client.module';
import { PermissionModule } from '@module/permission.module';
import { RolePermissionModule } from '@module/role-permission.module';
import { RoleModule } from '@module/role.module';
import { UserRoleModule } from '@module/user-role.module';
import { UserModule } from '@module/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from 'infrastructure/config/app.config';
import { DbModule } from 'infrastructure/config/db.config.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => {
                return {
                    stores: [
                        createKeyv(
                            `redis://${appConfig.redisHost}:${appConfig.redisPort}`,
                        ),
                    ],
                };
            },
        }),
        AuthModule,
        DbModule,
        ClientModule,
        PermissionModule,
        RolePermissionModule,
        RoleModule,
        UserRoleModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
