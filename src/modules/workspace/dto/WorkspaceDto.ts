import { User } from 'src/modules/user/user.schema';

export class WorkspaceDto {
    readonly _id: string;
    readonly name: string;
    readonly botId: string;
    readonly botAccessToken: string;
    readonly users: Array<User>;
}
