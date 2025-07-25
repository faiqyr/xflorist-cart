-- (Jalankan di psql atau tool database Anda)

-- Hapus tabel lama jika ada untuk memulai dari awal
DROP TABLE IF EXISTS cart_items, carts, products, users CASCADE;

-- 1. Buat tabel users (tidak berubah)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Buat tabel products (DIPERBARUI)
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY, -- Menggunakan Angka Auto-increment
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    img_url VARCHAR(255) -- Menambahkan kolom untuk URL gambar
);

-- 3. Buat tabel carts (tidak berubah)
CREATE TABLE carts (
    cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. Buat tabel cart_items (DIPERBARUI)
CREATE TABLE cart_items (
    cart_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(cart_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE, -- Referensi ke ID Angka
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE(cart_id, product_id)
);

-- --- Masukkan Data Sesuai Contoh Anda ---

-- Buat 1 dummy user
INSERT INTO users (user_id, email, password_hash) VALUES ('c1bde7f7-5f33-4a6c-9a22-3a5a7e6b7b2a', 'test@example.com', 'dummy_hash');

-- Buat cart untuk dummy user
INSERT INTO carts (user_id) VALUES ('c1bde7f7-5f33-4a6c-9a22-3a5a7e6b7b2a');

-- Masukkan data produk bunga Anda
INSERT INTO products (name, price, img_url) VALUES
('Flower1', 20000, '/imgs/flower1.png'),
('Flower2', 39000, '/imgs/flower2.png'),
('Flower3', 40000, '/imgs/flower3.png'),
('Flower4', 15000, '/imgs/flower4.png');