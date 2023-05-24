import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
      alias: '_id',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);
