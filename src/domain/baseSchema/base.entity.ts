import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class BaseSchema {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    })
    created_by: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
        index: true,
    })
    clientId: mongoose.Schema.Types.ObjectId;
}
