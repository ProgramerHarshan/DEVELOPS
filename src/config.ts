export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.APP_ENV || 'development',
    mongoUri: process.env.MONGOOSE_URI,
    webUrl: process.env.API_URL || 'http://localhost:3000',
    slack: {
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        slackSigningSecret: process.env.SLACK_SIGNING_SECRET,
        slackBotToken: process.env.SLACK_BOT_TOKEN
    },
});
