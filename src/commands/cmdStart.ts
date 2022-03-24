import { CustomContext } from '../types';
import { User } from '../mongoose';

export const cmdStart = async (ctx: CustomContext): Promise<void> => {
  const { id, name, username } = ctx.user;
  const user = new User({ id, name, username });
  try {
    await user.save();
    await ctx.reply('Добро пожаловать!');
  } catch (e: any) {
    const { id } = e.keyPattern;
    if (id)
      await ctx.reply('С возвращением!');
  }
};