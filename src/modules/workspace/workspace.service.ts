import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from './workspace.schema';

@Injectable()
export class WorkspaceService {
  constructor(
      @InjectModel('Workspace')
      private _workspaceModel: Model<Workspace>
  ) {}

  async findOne(query): Promise<Workspace> {
      return this._workspaceModel.findOne({ query });
  }
  async findAll(): Promise<Workspace[]> {
      return this._workspaceModel.find();
  }

  async findByIdAndUpdate(
      id: string,
      push: { users: any },
      set?: { installedBy } | { setting }
  ): Promise<Workspace> {
      return this._workspaceModel.findByIdAndUpdate(id, {
          $push: push,
          $set: set
      });
  }

  async create(data): Promise<Workspace> {
      return this._workspaceModel.create({
          teamId: data.team.id,
          teamName: data.team.name,
          botId: data.bot_user_id,
          botAccessToken: data.access_token,
          installedBy: null,
          users: []
      });
  }

  async findByIdAndPull(
      id: string,
      pull: { users: any }
  ): Promise<Workspace> {
      return this._workspaceModel.findByIdAndUpdate(id, {
          $pull: pull
      });
  }
}
