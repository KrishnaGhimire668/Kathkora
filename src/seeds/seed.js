import "dotenv/config";

import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";
import products from "./products.js";

await connectDB();

await Product.deleteMany();

await Product.insertMany(products);

console.log(" Products Seeded");

process.exit();