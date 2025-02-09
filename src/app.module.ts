import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './infrastructure/config/db.config.module';
import { ClientModule } from './infrastructure/modules/client.module';
import { PermissionModule } from './infrastructure/modules/permission.module';
import { RolePermissionModule } from './infrastructure/modules/role-permission.module';
import { RoleModule } from './infrastructure/modules/role.module';
import { UserRoleModule } from './infrastructure/modules/user-role.module';
import { UserModule } from './infrastructure/modules/user.module';
import { AuthModule } from './infrastructure/modules/auth.module';
import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { appConfig } from './infrastructure/config/app.config';


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
                        createKeyv(`redis://${appConfig.redisHost}:${appConfig.redisPort}`),
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
export class AppModule { }
