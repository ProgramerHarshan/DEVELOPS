import { WebAPICallResult } from '@slack/web-api';

export interface UsersInfoDto extends WebAPICallResult {
    ok: boolean;
    user: {
        id: string;
        name: string;
        real_name: string;
        tz: string;
        profile: {
            email: string;
            real_name: string;
            display_name: string;
            image_24: string;
            image_original: string;
        };
        is_bot: boolean;
        is_admin: false;
        is_owner: false;
        is_primary_owner: false;
        is_invited_user: boolean;
    };
}
