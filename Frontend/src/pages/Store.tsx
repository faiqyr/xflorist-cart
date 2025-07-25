import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useState, useEffect } from "react";

// Tipe data untuk produk yang diterima dari API
interface Product {
  productId: number;
  name: string;
  price: number;
  imgUrl: string;
}

// Alamat URL endpoint produk di backend
const PRODUCTS_API_URL = 'http://localhost:5000/api/products';

export function Store() {
  // State untuk menyimpan data, status loading, dan error
  const [storeItems, setStoreItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data produk dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_API_URL);
        if (!response.ok) {
          throw new Error("Gagal mengambil data produk dari server.");
        }
        const data: Product[] = await response.json();
        setStoreItems(data);
      } catch (err) {
        // Penanganan error yang aman secara tipe (type-safe)
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Array dependensi kosong memastikan ini hanya berjalan sekali

  return (
    <>
      <h1>Store</h1>

      {/* Tampilkan pesan saat data sedang diambil */}
      {isLoading && <p>Loading products...</p>}
      
      {/* Tampilkan pesan jika terjadi error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Tampilkan produk jika berhasil dimuat */}
      {!isLoading && !error && (
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeItems.map((item) => (
            <Col key={item.productId}>
              {/* Meneruskan 'productId' dari API sebagai prop 'id' ke komponen StoreItem */}
              <StoreItem {...item} id={item.productId} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}