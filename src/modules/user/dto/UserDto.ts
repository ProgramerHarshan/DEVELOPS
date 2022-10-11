import { Types } from 'mongoose';

export class UserDto {
    readonly _id: string;
    readonly workspace: Types.ObjectId;
    readonly uid: string;
    readonly accessToken: string;
    readonly name: string;
    readonly email: string;
    readonly profileImage: string;
    readonly botConversationId: string;
}