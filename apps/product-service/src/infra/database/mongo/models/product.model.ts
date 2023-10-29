import { model } from 'mongoose';
import { ProductDocument } from '../interfaces';
import { ProductSchema } from '../schemas';

export const ProductModel = model<ProductDocument>('Product', ProductSchema);
