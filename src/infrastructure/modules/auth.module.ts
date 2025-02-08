import { Module } from '@nestjs/common';
import { AuthController } from 'src/application/controller/auth.controller';
import { AuthService } from 'src/domain/services/auth.service';
import { UserModule } from './user.module';
import { ClientModule } from './client.module';

@Module({
    imports: [
        UserModule,
        ClientModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
