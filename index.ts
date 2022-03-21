import 'dotenv/config';
import { token } from './src/config';
import { Bot, session } from 'grammy';
import { commandList } from './src/assets/commandList';
import { name_and_price } from './src/regexp';
import { rawStringToRecords } from './src/helpers/rawStringToRecords';
import { CustomContext } from './src/types';
import { setState } from './src/middlewares/setState';

interface SessionData {
  r?: number;
}


const bot = new Bot<CustomContext>(token);

bot.api.setMyCommands(commandList);

function initial(): SessionData {
  return {};
}

bot.use(session({ initial }));
bot.use(setState);

bot.hears(name_and_price, ctx => {
  console.log(rawStringToRecords(ctx.msg.text));
});


bot.start();