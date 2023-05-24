import 'dotenv/config';
import mongoose from 'mongoose';
import { ProductSchema } from '../../modules/products/schemas/product.schema';

const DATABASE_URL = process.env.DATABASE_URL;

const products = [{ price: 10.99 }, { price: 22.98 }, { price: 33.5 }];

async function seed() {
  try {
    const ProductModel = mongoose.model('Product', ProductSchema);
    await mongoose.connect(DATABASE_URL);
    await ProductModel.insertMany(products);
    console.log('Seed data inserted!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
