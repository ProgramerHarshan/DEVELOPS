import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SlackService } from '../slack/services/slack.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
      private _slackService: SlackService,
      private _workspaceService: WorkspaceService,
      @InjectModel('User')
      private _userModel: Model<User>
  ) {}

  async findById(id: string): Promise<User> {
      return this._userModel.findById(id).populate('workspace');
  }

  async findOne(query: {}): Promise<any> {
      return this._userModel.findOne(query).populate('workspace');
  }

  async updateOrCreate(
      workspace: any,
      userInfo: any,
      authed_user?
  ): Promise<any> {
      const {
          id,
          profile,
          tz,
          is_admin,
          is_owner,
          is_primary_owner,
          is_bot } = userInfo.user;
      const userData = {
          workspace: workspace._id,
          uniqueId: id,
          uid: Math.random().toString(36).substring(7),
          accessToken: authed_user ? authed_user.access_token : null,
          name: profile.display_name
              ? profile.display_name
              : profile.real_name,
          email: profile.email,
          profileImage: profile.image_original
              ? profile.image_original
              : profile.image_24,
          timezone: tz,
          isAdmin: is_admin,
          isOwner: is_owner,
          isPrimaryOwner: is_primary_owner,
          isBot: is_bot,
      };
      const user = await this._userModel.create(userData);
      this._workspaceService.findByIdAndUpdate(workspace._id, {
          users: user._id
      });

      return user;
  }

  async findByIdAndUpdate(id: string, data): Promise<any> {
      return this._userModel.findByIdAndUpdate(id, data);
  }
  async findByIdAndUpdateLog(id, paymentLog): Promise<any> {
      return this._userModel.findByIdAndUpdate(id, { paymentLog });
  }
}
