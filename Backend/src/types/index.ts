// src/types/index.ts
import { Request } from 'express';

// Tipe untuk item di dalam keranjang, disesuaikan dengan data baru
export interface CartItem {
  productId: number; // Diubah menjadi number
  name: string;
  price: number;
  imgUrl: string; // Ditambahkan
  quantity: number;
}

// Menambahkan properti 'user' ke object Request Express (tidak berubah)
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    cartId: string;
  };
}