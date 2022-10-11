import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { App, ExpressReceiver } from '@slack/bolt';
import { AppService } from './app.service';
import { SlackModule } from './modules/slack/slack.module';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import config from './config';
import { UserService } from './modules/user/user.service';
import { SlackService } from './modules/slack/services/slack.service';
import { HomeEventService } from './modules/slack/services/home.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('mongoUri')
            }),
            inject: [ConfigService]
        }),
        WorkspaceModule,
        UserModule,
        SlackModule,
    ],
    providers: [AppService, SlackService, HomeEventService],
})
export class AppModule {
  constructor(
    private _appService: AppService,
    private _configService: ConfigService,
    private _userService: UserService
) {}
  initSlackEvents(receiver: ExpressReceiver) {
    const boltApp = new App({
        signingSecret: this._configService.get('slack.slackSigningSecret'),
        clientId: this._configService.get('slack.clientId'),
        clientSecret: this._configService.get('slack.clientSecret'),
        scopes: '',
        authorize: async ({ userId, teamId }) => {
            const user = await this._userService.findOne({
                uniqueId: userId
            });
            return {
                botId: user.workspace.botId,
                botToken: user.workspace.botAccessToken,
                botUserId: user.workspace.botId,
                user
            };
        },
        receiver,
        installerOptions: {
            redirectUriPath: '/slack/add' // and here!
        },
    });
    this._appService.initSlackCommand(boltApp);
}
}
