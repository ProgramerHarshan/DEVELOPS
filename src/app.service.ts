import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EVENT_APP_HOME_OPENED } from './common/constants/event';
import { HomeEventService } from './modules/slack/services/home.service';
import { UserService } from './modules/user/user.service';
import { WorkspaceService } from './modules/workspace/workspace.service';

@Injectable()
export class AppService {
  constructor(
    private _configService: ConfigService,
    private _homeEventService: HomeEventService,
    private _workspaceService: WorkspaceService,
    private _userService: UserService,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  initSlackCommand(boltApp: any): void {

    // action on  events
    boltApp.event(
      EVENT_APP_HOME_OPENED,
      async ({ client, body, context }) => {
        try {
          this._homeEventService.homeTab(
            context.user.workspace.botAccessToken,
            body.event.user
          );
        } catch (error) {
          console.error(error);
        }
      }
    );
  }
}
