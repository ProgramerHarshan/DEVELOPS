import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressReceiver } from '@slack/bolt';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const receiver = new ExpressReceiver({
        signingSecret: new ConfigService().get('SLACK_SIGNING_SECRET')
    });

    const appModule = app.get(AppModule);
    const configService = app.get(ConfigService);

    appModule.initSlackEvents(receiver);
    app.use(receiver.router);
    await app.listen(configService.get('port'));
}

bootstrap();
