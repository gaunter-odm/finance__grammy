import mongoose from 'mongoose';
import { mongoUrl } from '../config';
import { userSchema } from './schemas/UserSchema';
import { User as UModel, UserStatic } from '../types';

export const connect = mongoose.createConnection(mongoUrl);
export const User = connect.model<UModel, UserStatic>('User', userSchema);