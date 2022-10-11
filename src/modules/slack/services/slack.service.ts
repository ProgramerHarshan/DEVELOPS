import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient, WebAPICallResult, ErrorCode, Block } from '@slack/web-api';
@Injectable()
export class SlackService {
    private _webClient: WebClient;
    constructor(private _configService: ConfigService) {
        this._webClient = new WebClient();
    }

    async oauthAccess(
        code: string,
        redirectUri: string
    ): Promise<WebAPICallResult> {
        const data = {
            code: code,
            client_id: this._configService.get('slack.clientId'),
            client_secret: this._configService.get('slack.clientSecret'),
            redirect_uri: redirectUri
        };
        let response;
        try {
            response = await this._webClient.oauth.v2.access(data);
        } catch (error) {
            console.log(error);
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
            } else {
                throw new Error(error);
            }
        }

        return response;
    }
    
    async viewsPublish(
        token: string,
        userId: string,
        view: any
    ): Promise<WebAPICallResult> {
        const data = {
            token: token,
            user_id: userId,
            view: view
        };

        let response;
        try {
            response = await this._webClient.views.publish(data);
        } catch (error) {
            console.log(error);
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
            } else {
                throw new Error(error);
            }
        }
        return response;
    }

    async viewsOpen(
        token: string,
        triggerId: string,
        view: any
    ): Promise<WebAPICallResult> {
        const data = {
            token: token,
            trigger_id: triggerId,
            view: view
        };
        let response;
        try {
            response = await this._webClient.views.open(data);
        } catch (error) {
            console.log(error);
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
            } else {
                throw new Error(error);
            }
        }
        return response;
    }

    async usersInfo(token: string, user: string): Promise<WebAPICallResult> {
        const data = {
            token: token,
            user: user
        };
        let response;
        try {
            response = await this._webClient.users.info(data);
        } catch (error) {
            console.log(error);
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

}
