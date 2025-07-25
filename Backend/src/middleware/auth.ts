// src/middleware/auth.ts
import { Response, NextFunction } from 'express';
import db from '../db';
import { AuthenticatedRequest } from '../types';

export const pseudoAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Ambil user ID dari header. Ganti ini dengan verifikasi JWT di aplikasi nyata.
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
  }

  try {
    // Cari cart_id yang berasosiasi dengan user_id
    const cartResult = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [userId]);

    if (cartResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    const cartId = cartResult.rows[0].cart_id;

    // Lampirkan info user & cart ke object request
    req.user = { userId, cartId };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};