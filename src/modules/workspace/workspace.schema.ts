import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema({
    timestamps: true,
    versionKey: false
})
export class Workspace extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    teamId: string;

    @Prop({
        required: true,
    })
    teamName: string;

    @Prop({
        unique: true,
        sparse: true,
    })
    botId?: string;

    @Prop()
    botAccessToken?: string;

    @Prop({
        ref: 'User',
        default: null,
    })
    installedBy: Types.ObjectId;

    @Prop({
        required: true,
        default: 'slack'
    })
    tool: string;

    @Prop([{ type: [Types.ObjectId], ref: 'User' }])
    users: Types.Array<User>;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
