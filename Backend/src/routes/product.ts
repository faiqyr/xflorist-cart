// src/routes/products.ts
import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Pastikan nama tabel 'products' sudah benar
    const query = 'SELECT product_id AS "productId", name, price, img_url AS "imgUrl" FROM products ORDER BY product_id;';
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
});

export default router;