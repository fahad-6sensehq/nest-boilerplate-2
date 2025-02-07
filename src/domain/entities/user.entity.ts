import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../baseSchema/base.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserRole' })
    userRoleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
