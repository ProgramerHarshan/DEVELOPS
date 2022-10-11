import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true,
    versionKey: false
})
export class User extends Document {
    @Prop({
        ref: 'Workspace'
    })
    workspace: Types.ObjectId;

    @Prop({
        unique: true,
    })
    uniqueId: string;

    @Prop()
    uid: string;
    
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    profileImage: string;

    @Prop()
    timezone: string;

    @Prop()
    accessToken: string;

    @Prop()
    botConversationId: string;

    @Prop()
    isBot: string;

    @Prop()
    isAdmin: boolean;

    @Prop()
    isOwner: boolean;

    @Prop({
        required: true,
        default: 'slack'
    })
    tool: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
