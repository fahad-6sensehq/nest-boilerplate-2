import { IsString } from "@nestjs/class-validator";

export class CreatePermissionDto {
    @IsString()
    name: string;
}
