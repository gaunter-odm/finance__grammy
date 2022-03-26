import 'dotenv/config';
import { Bot, session } from 'grammy';
import { token } from './src/config';
import { commandList } from './src/assets/commandList';
import { name_and_price } from './src/regexp';
import { CustomContext } from './src/types';
import { setState } from './src/middlewares/setState';
import { setUserData } from './src/middlewares/setUserData';
import { router } from './src/routes/router';
import { makeRecords } from './src/hears/makeRecords';
import { cmdStart } from './src/commands/cmdStart';
import { initialSession as initial } from './src/assets/initialSession';
import { setPrintTable } from './src/middlewares/setPrintTable';
import { setTimeZone } from './src/middlewares/setTimeZone';
import { cmdPrintToday } from './src/commands/cmdPrintToday';

const bot = new Bot<CustomContext>(token);

bot.api.setMyCommands(commandList);

bot.use(session({ initial }));

bot.use(setUserData);
bot.use(setTimeZone);
bot.use(setState);
bot.use(setPrintTable);
bot.use(router);

bot.command('start', cmdStart);
bot.command('today', cmdPrintToday);

bot.hears(name_and_price, makeRecords);

bot.hears(/./, ctx => ctx.deleteMessage());
bot.on('message:sticker', ctx => ctx.deleteMessage());
bot.on('message:document', ctx => ctx.deleteMessage());

bot.start().catch(console.log);