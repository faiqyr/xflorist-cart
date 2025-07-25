import { Pool } from 'pg'; // Mengimpor library 'pg'
import dotenv from 'dotenv';

dotenv.config(); // Membaca file .env

// Membuat pool koneksi baru dengan konfigurasi dari .env
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Mengekspor objek yang memiliki satu fungsi: 'query'
export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};