import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SlackService } from '../slack/services/slack.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { WorkspaceService } from '../workspace/workspace.service';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'User'
      }
    ]),
    WorkspaceModule
  ],
  controllers: [UserController],
  providers: [UserService, SlackService],
  exports: [UserService]
})
export class UserModule {}
