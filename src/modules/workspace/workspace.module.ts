import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceSchema } from './workspace.schema';
import { SlackService } from '../slack/services/slack.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Workspace',
        schema: WorkspaceSchema,
        collection: 'Workspace'
      }
    ]),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, SlackService],
  exports: [WorkspaceService]
})
export class WorkspaceModule {}
