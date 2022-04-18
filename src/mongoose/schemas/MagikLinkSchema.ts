import { Schema, Types } from 'mongoose';
import { v4 } from 'uuid';
import { Magik } from '../../types';

export const magikLinkSchema = new Schema<Magik>({
  user: Types.ObjectId,
  magik: {
    type: String,
    default: v4(),
  },
}, { timestamps: true });

magikLinkSchema.index({ createdAt: 1 }, { expires: '5m' });