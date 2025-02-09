import { Module } from '@nestjs/common';
import { AuthController } from 'src/application/controller/auth.controller';
import { AuthService } from 'src/domain/services/auth.service';
import { UserModule } from './user.module';
import { ClientModule } from './client.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/domain/strategies/access-token.strategy';

@Module({
    imports: [
        JwtModule.register({}),
        UserModule,
        ClientModule,
    ],
    providers: [AuthService, AccessTokenStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
