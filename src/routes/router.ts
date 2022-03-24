import { Router } from '@grammyjs/router';
import { CustomContext } from '../types';
import { InlineKeyboard } from 'grammy';

export const router = new Router<CustomContext>(ctx => ctx.session.route);

router.route('k', ctx => {
  ctx.reply('keyboard', {
    reply_markup: new InlineKeyboard().text('btn', 'btn'),
  });
});