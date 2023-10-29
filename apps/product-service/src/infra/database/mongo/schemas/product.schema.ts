import { Schema } from 'mongoose';
import { ProductDocument } from '../interfaces';

export const ProductSchema = new Schema<ProductDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);
