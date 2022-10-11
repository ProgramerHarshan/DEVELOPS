import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import { SlackService } from './slack.service';
import { homeModal } from 'src/providers/modals/homeModal';
import { home } from 'src/providers/blocks/home/home';

@Injectable()
export class HomeEventService {
    constructor(
        private _userService: UserService,
        private _configService: ConfigService,
        private _slackService: SlackService
    ) {}

    async homeTab(workspaceToken, userId: string) {
        const user = await this._userService.findOne({
            uniqueId: userId
        });
        await this._slackService.viewsPublish(
            workspaceToken,
            userId,
            home(user)
        );
    }

    async homeModal(workspaceToken, triggerId: any) {
        await this._slackService.viewsOpen(
            workspaceToken,
            triggerId,
            homeModal()
        );
    }

}
