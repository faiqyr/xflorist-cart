// src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cartRoutes from './routes/cart';
import productRoutes from './routes/product'; // <-- 1. PASTIKAN RUTE PRODUK DI-IMPORT
import { pseudoAuth } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes); // <-- 2. PASTIKAN RUTE PRODUK DIGUNAKAN DI SINI
app.use('/api/cart', pseudoAuth, cartRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Cart API with PostgreSQL!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});