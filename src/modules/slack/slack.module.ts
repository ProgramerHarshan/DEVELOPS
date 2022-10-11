import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { SlackService } from './services/slack.service';
import { SlackController } from './slack.controller';

@Module({
  imports: [WorkspaceModule, UserModule],
  controllers: [SlackController],
  providers: [SlackService]
})
export class SlackModule {}
