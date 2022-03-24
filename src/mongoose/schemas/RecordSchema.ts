import { Record } from '../../types';
import { Schema } from 'mongoose';

export const recordSchema = new Schema<Record>({
  date: String,
  position: String,
  price: Number,
  currency: String,
});