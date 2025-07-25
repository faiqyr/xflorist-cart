import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLeaf, FaStar, FaShippingFast } from "react-icons/fa";
import "./Home.css"; // Import file CSS

// Path yang benar untuk gambar di dalam folder 'public'
const bouquet1_url = "/imgs/fko1.png";
const bouquet2_url = "/imgs/fko2.png";
const bouquet3_url = "/imgs/fko3.png";
const gelombang_url = "/gelombang.png";

export function Home() {
  return (
    <div className="home-container">
      {/* Konten Hero Section */}
      <Container className="hero-content">
        <h1>Kirimkan Cinta Lewat Rangkaian</h1>
        <h2 className="highlight-text">Bunga Terindah</h2>
        <p className="address-text">
          Jl. Cendana No. 12, Kec. Tawang, Kota Tasikmalaya, Jawa Barat 46112
        </p>
        <div>
          <Link to="/store">
            <Button
              variant="outline-dark"
              className="btn-custom-dark text-active"
            >
              Eksplorasi
            </Button>
          </Link>
          <Link to="/store">
            <Button variant="dark" className="btn-custom-dark">
              Order Sekarang
            </Button>
          </Link>
        </div>
      </Container>

      {/* Konten Gambar Bunga */}
      <div className="bouquets-wrapper">
        {/* Latar Belakang Gelombang */}
        <Image
          src={gelombang_url}
          alt="Latar belakang gelombang"
          className="hero-background-png"
        />
        <div className="bouquet-item bouquet-1">
          <Image src={bouquet1_url} alt="Buket Bunga Putih" fluid />
        </div>
        <div className="bouquet-item bouquet-2">
          <Image src={bouquet2_url} alt="Buket Bunga Pink" fluid />
        </div>
        <div className="bouquet-item bouquet-3">
          <Image src={bouquet3_url} alt="Buket Bunga Merah" fluid />
        </div>
      </div>

      {/* =============================================== */}
      {/* ========= BAGIAN BARU DIMULAI DARI SINI ========= */}
      {/* =============================================== */}

      {/* 1. Bagian Keunggulan Layanan */}
      <div className="rows" />
      <Container as="section" className="section text-center">
        <h2 className="section-title">Mengapa Memilih Kami?</h2>
        <Row>
          <Col md={4} className="mb-9">
            <FaLeaf className="value-prop-icon" />
            <h3>Bunga Segar Pilihan</h3>
            <p>
              Kami hanya menggunakan bunga dengan kualitas terbaik yang dipetik
              setiap hari.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <FaStar className="value-prop-icon" />
            <h3>Desain Kreatif</h3>
            <p>
              Setiap rangkaian dirancang oleh florist berpengalaman dengan
              sentuhan seni.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <FaShippingFast className="value-prop-icon" />
            <h3>Pengiriman Cepat</h3>
            <p>
              Pesanan Anda kami antar dengan cepat dan aman sampai ke tujuan.
            </p>
          </Col>
        </Row>
      </Container>

      {/* 2. Bagian Cara Pemesanan */}
      <div className="how-to-order-section section">
        <Container>
          <h2 className="section-title">Pesan Dalam 3 Langkah Mudah</h2>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="step-number">1</div>
              <h4 className="step-title">Pilih Buket</h4>
              <p>
                Jelajahi koleksi kami dan temukan buket yang paling Anda sukai.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="step-number">2</div>
              <h4 className="step-title">Isi Detail</h4>
              <p>Tentukan alamat pengiriman dan tulis pesan spesial Anda.</p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="step-number">3</div>
              <h4 className="step-title">Bayar & Tunggu</h4>
              <p>
                Selesaikan pembayaran dan biarkan kami yang mengantar keajaiban.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

     

  

      {/* Section "Why Us" yang akan tampil di depan */}
      <div className="why-us-section section">
        <Container >
          <Row className="align-items-center">
            {/* Kolom untuk Gambar Buket */}
            <Col md={5}>
  {/* 1. Buat div pembungkus dengan className baru */}
  <div className="image-container">

    {/* 2. Gambar sebagai lapisan dasar */}
    <Image
      src="/imgs/fko1.png"
      alt="Buket Bunga Cantik"
      fluid
      className="why-us-image"
    />

    {/* 3. .row-2 sebagai lapisan atas (overlay) */}
    <div className="row-2">
      {/* Anda bisa menambahkan konten di sini, misal: teks */}
    </div>
    
  </div>
</Col>

            {/* Kolom untuk Teks Keunggulan */}
            <Col md={7}>
              <div className="why-us-content">
                <h2 className="section-title text-start">Mengapa XFlorist?</h2>
                <p className="text-muted mb-4">Cari testimoni disini</p>

                <div className="feature-box">
                  <h4>Bunga Selalu Segar</h4>
                  <p>
                    Kami hanya menggunakan bunga segar pilihan terbaik setiap
                    hari agar rangkaian yang kamu terima selalu indah dan tahan
                    lama.
                  </p>
                </div>

                <div className="feature-box">
                  <h4>Desain Buket Bisa Custom</h4>
                  <p>
                    Setiap buket dirangkai dengan penuh detail dan bisa
                    disesuaikan dengan tema, warna, dan budget sesuai
                    keinginanmu.
                  </p>
                </div>

                <div className="feature-box">
                  <h4>Praktis & Mudah Dipesan</h4>
                  <p>
                    Order cukup lewat WhatsApp atau klik tombol "Pesan
                    Sekarang". Kami pandu dari awal sampai bunga sampai tujuan
                    dengan aman.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

         {/* 3. Bagian Testimoni */}
      <Container as="section" className="section text-center">
        <h2 className="section-title">Kata Mereka</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <blockquote className="blockquote">
              <p className="mb-8">
                "Rangkaian bunganya sangat indah dan segar! Pelayanannya juga
                cepat dan ramah. Sangat direkomendasikan untuk hadiah ulang
                tahun istri."
              </p>
              <footer className="blockquote-footer mt-8">
                Budi, Pelanggan Setia
              </footer>
            </blockquote>
          </Col>
        </Row>
      </Container>
      </div>

      
    </div>
  );
}
