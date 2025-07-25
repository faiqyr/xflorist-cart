import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

// --- Tipe Data & Konfigurasi ---

type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Tipe data ini disesuaikan dengan respons dari backend (GET /api/cart)
type CartItem = {
  productId: number; // Menggunakan productId agar konsisten
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const API_BASE_URL = 'http://localhost:5000/api/cart';
const USER_ID = 'c1bde7f7-5f33-4a6c-9a22-3a5a7e6b7b2a'; // User dummy

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // State untuk UI (tidak berubah)
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk data keranjang, sekarang diambil dari API
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- Fungsi Inti Baru untuk Berkomunikasi dengan API ---

  // Fungsi untuk mengambil data terbaru dari backend
  const fetchCart = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: { 'x-user-id': USER_ID },
      });
      if (!response.ok) throw new Error('Gagal mengambil keranjang dari server.');
      const data: CartItem[] = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Gagal fetch keranjang:", error);
    }
  };

  // Mengambil data keranjang sekali saat komponen pertama kali dimuat
  useEffect(() => {
    fetchCart();
  }, []); // Dependensi kosong berarti hanya jalan sekali

  // --- Fungsi yang Digunakan oleh Komponen Lain (Sekarang memanggil API) ---

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    // Diubah untuk menggunakan 'productId'
    return cartItems.find((item) => item.productId === id)?.quantity || 0;
  }

  async function increaseCartQuantity(id: number) {
    // Sekarang memanggil endpoint /add
    try {
      await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': USER_ID,
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      fetchCart(); // Muat ulang data keranjang setelah berhasil
    } catch (error) {
      console.error("Gagal menambah item:", error);
    }
  }

  async function decreaseCartQuantity(id: number) {
    const currentQuantity = getItemQuantity(id);

    // Jika kuantitas 1, panggil API hapus
    if (currentQuantity === 1) {
      await removeFromCart(id);
      return;
    }

    // Jika lebih dari 1, panggil API update
    try {
      await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': USER_ID,
        },
        body: JSON.stringify({ quantity: currentQuantity - 1 }),
      });
      fetchCart(); // Muat ulang data keranjang
    } catch (error) {
      console.error("Gagal mengurangi kuantitas:", error);
    }
  }

  async function removeFromCart(id: number) {
    // Sekarang memanggil endpoint /remove/:productId
    try {
      await fetch(`${API_BASE_URL}/remove/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': USER_ID },
      });
      fetchCart(); // Muat ulang data keranjang
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}