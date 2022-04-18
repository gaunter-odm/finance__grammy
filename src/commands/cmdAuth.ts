import { CustomContext } from '../types';
import { MagikLink, User } from '../mongoose';
import { InlineKeyboard } from 'grammy';

export const cmdAuth = async (ctx: CustomContext) => {
  const { id } = ctx.user;

  const getUser = await User.findOne({ id });
  if (!getUser) return;

  const user = getUser._id;
  const magikLink = new MagikLink({ user });

  await magikLink.save();

  const { magik } = magikLink;

  const { message_id } = await ctx.reply('Ссылка дял авторизации действительна 5 минут', {
    reply_markup: new InlineKeyboard()
      .url('Авторизироваться', `www.google.com/${magik}`),
  });

  new Promise((resolve, reject) => {
    setTimeout(async function() {
      try {
        await ctx.deleteMessage();
        await ctx.api.deleteMessage(id, message_id);
      } catch (e) {
        reject(e);
      }
    }, 5 * 1000);
  }).catch(() => {
    console.log('Error deleting message, file: src/commands/cmdAuth.ts', new Date());
  });

};