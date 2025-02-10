import { AuthController } from '@controller/auth.controller';
import { ClientModule } from '@module/client.module';
import { UserModule } from '@module/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@service/auth.service';
import { AccessTokenStrategy } from 'domain/strategies/access-token.strategy';

@Module({
    imports: [JwtModule.register({}), UserModule, ClientModule],
    providers: [AuthService, AccessTokenStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
