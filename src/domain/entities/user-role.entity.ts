import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserRoleDocument = HydratedDocument<UserRole>;

@Schema({ timestamps: true })
export class UserRole {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    roleId: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
