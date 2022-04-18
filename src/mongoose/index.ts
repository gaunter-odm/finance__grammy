import mongoose from 'mongoose';
import { mongoUrl } from '../config';
import { userSchema } from './schemas/UserSchema';
import { Magik, User as UModel, UserStatic } from '../types';
import { magikLinkSchema } from './schemas/MagikLinkSchema';

export const connect = mongoose.createConnection(mongoUrl);
export const User = connect.model<UModel, UserStatic>('User', userSchema);
export const MagikLink = connect.model<Magik>('MagikLink', magikLinkSchema);