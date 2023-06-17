# telegram-wear-raincoat-bot

Extremely Simple Telegram Bot to send me a message each morning on if I need to wear a raincoat to my telegram channel

## Requirements

-  axios: ^1.4.0
-  dotenv: ^16.3.0
-  node-telegram-bot-api: ^0.61.0
- [Open Weather API Key](https://openweathermap.org/) -- Free plan allows up to 1,000,000 calls/month & 60 calls/minute
- [Telegram Bot and Channel](https://core.telegram.org/bots)

## Getting Started

To run simply clone and download code.

Then run the below line to install required packages.

```
yarn install
```

Place the keys, location and your channel id in a .env file like so:

```
LATITUDE=
LONGITUDE=
WEATHER_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

```

## Usage

```
ts-node index.ts
```

## FAQ

### How do I get my channel ID for Telegram?

Check out this answer on [stackoverflow](https://stackoverflow.com/a/33862907/4712724)

## How do I set this up to send me data automatically every morning?

I personally just use a cron job on my Homelab and schedule it to run everyday at 7am.

```
0 7 * * * ts-node /path/to/file/index.ts
```

## Authors

Jordan Tryon

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
