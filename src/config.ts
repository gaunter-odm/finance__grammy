export const isDev: boolean = process.env.NODE_ENV === 'development';
// @ts-ignore
export const token: string = process.env[isDev ? 'BOT_TOKEN_DEV' : 'BOT_TOKEN'];
