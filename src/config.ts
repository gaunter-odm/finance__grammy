export const isDev: boolean = process.env.NODE_ENV === 'development';
export const token = process.env[isDev ? 'BOT_TOKEN_DEV' : 'BOT_TOKEN'] || '';
export const mongoUrl = process.env[isDev ? 'MONGO_DEV' : 'MONGO'] || '';
