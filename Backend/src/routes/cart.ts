// src/routes/cart.ts
import { Router, Response } from 'express';
import db from '../db';
import { AuthenticatedRequest } from '../types';

const router = Router();

// [GET] /api/cart -> Mendapatkan isi keranjang
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  const { cartId } = req.user!;

  try {
    const query = `
      SELECT
        p.product_id AS "productId",
        p.name,
        p.price,
        p.img_url AS "imgUrl",
        ci.quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.product_id
      WHERE ci.cart_id = $1
      ORDER BY p.name;
    `;
    const result = await db.query(query, [cartId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart.' });
  }
});

// [POST] /api/cart/add -> Menambah item atau menambah kuantitasnya
router.post('/add', async (req: AuthenticatedRequest, res: Response) => {
  const { cartId } = req.user!;
  const { productId, quantity }: { productId: number; quantity: number } = req.body;

  if (!productId || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ message: 'Product ID and a valid positive quantity are required.' });
  }

  try {
    const query = `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
      RETURNING *;
    `;
    const result = await db.query(query, [cartId, productId, quantity]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart.' });
  }
});

// BARU: [PUT] /api/cart/update/:productId -> Mengubah kuantitas item
router.put('/update/:productId', async (req: AuthenticatedRequest, res: Response) => {
  const { cartId } = req.user!;
  const productId = parseInt(req.params.productId, 10);
  const { quantity }: { quantity: number } = req.body;

  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid Product ID.' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ message: 'A valid positive quantity is required.' });
  }
  
  try {
    const query = `
      UPDATE cart_items
      SET quantity = $1
      WHERE cart_id = $2 AND product_id = $3
      RETURNING *;
    `;
    const result = await db.query(query, [quantity, cartId, productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found in cart to update.' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ message: 'Failed to update item quantity.' });
  }
});


// [DELETE] /api/cart/remove/:productId -> Menghapus satu item spesifik
router.delete('/remove/:productId', async (req: AuthenticatedRequest, res: Response) => {
  const { cartId } = req.user!;
  const productId = parseInt(req.params.productId, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid Product ID.' });
  }

  try {
    const result = await db.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ message: 'Failed to remove item.' });
  }
});

// BARU: [DELETE] /api/cart/clear -> Mengosongkan seluruh keranjang
router.delete('/clear', async (req: AuthenticatedRequest, res: Response) => {
  const { cartId } = req.user!;

  try {
    await db.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    res.status(204).send();
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart.' });
  }
});


export default router;