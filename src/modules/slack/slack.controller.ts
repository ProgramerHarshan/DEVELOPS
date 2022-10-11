import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { SlackService } from './services/slack.service';
import { Request } from 'express';

@Controller('slack')
export class SlackController {
  constructor(
    private _userService: UserService,
    private _slackService: SlackService,
    private _workspaceService: WorkspaceService,
    private _configService: ConfigService
  ) { }

  @Get('redirect')
  async add(@Req() request: Request) {
    const data = await this._slackService.oauthAccess(
      request.query.code.toString(),
      `${this._configService.get('webUrl')}/slack/redirect`
    );
    if (data.ok) {
      const { team, authed_user }: any = data;
      let workspace = await this._workspaceService.findOne({
        teamId: team.id
      });
      if (!workspace) {
        workspace = await this._workspaceService.create(data);
      }
      const usersInfo = await this._slackService.usersInfo(
        workspace.botAccessToken,
        authed_user.id
      );
      if (usersInfo.ok) {
        const user = await this._userService.updateOrCreate(
          workspace,
          usersInfo,
          authed_user
        );
        // const url = `${this._configService.get('webUrl')}/team/${
        //     workspace._id
        // }/${user.uniqueId}/${workspace.name}`;
        // this._slackService.postBlockMessage(
        //     workspace.botAccessToken,
        //     user.botConversationId,
        //     `Hi <@${user.name}> This is a sample App`,
        //     greeting(user.name)
        // );

        return {
          status: true,
          message:' Succesfuly authorized with the app '
        };
      } else {
        return { status: usersInfo.ok, error: usersInfo.error };
      }
    } else {
      return { status: data.ok, error: data.error };
    }
  }
}
