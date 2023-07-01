import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

type Config = {
  WEATHER_API_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  LATITUDE: string;
  LONGITUDE: string;
};

const config: Config = {
  WEATHER_API_KEY: process.env.WEATHER_API_KEY!,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID!,
  LATITUDE: process.env.LATITUDE!,
  LONGITUDE: process.env.LONGITUDE!,
};

const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN);

const getWeather = async () => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${config.LATITUDE}&lon=${config.LONGITUDE}&appid=${config.WEATHER_API_KEY}`
    );

    const forecastList = response.data.list;
    const rainHours: string[] = [];

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    forecastList.forEach((item: any) => {
      const weather = item.weather[0].main;
      const forecastDate = item.dt_txt.split(' ')[0]; // get the date part of the date time string
      if (weather.toLowerCase().includes('rain') && forecastDate === todayStr) {
        rainHours.push(item.dt_txt);
      }
    });

    if (rainHours.length > 0) {
      let message = `Heads up! It's going to rain at your location at the following hours:\n`;
      rainHours.forEach((hour) => {
        message += `${hour}\n`;
      });
      bot.sendMessage(config.TELEGRAM_CHAT_ID, message);
    }
  } catch (err) {
    console.error(err);
  }
};

getWeather();
