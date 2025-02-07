import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RolePermissionDocument = HydratedDocument<RolePermission>;

@Schema({ timestamps: true })
export class RolePermission {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    roleId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' })
    permissionId: string;
}

export const RolePermissionSchema =
    SchemaFactory.createForClass(RolePermission);
