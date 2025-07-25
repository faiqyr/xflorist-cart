import { Container, Row, Col, Image } from "react-bootstrap";
import { FaHandHoldingHeart, FaAward, FaRegSmile } from 'react-icons/fa';
import './About.css'; // Impor file CSS yang baru dibuat

export function About() {
  return (
    <>
      {/* 1. Bagian Header Halaman */}
      <div className="about-header">
        <Container>
          <h1>Tentang XFlorist</h1>
          <p>Menyebarkan kebahagiaan melalui keindahan bunga, satu rangkaian dalam satu waktu.</p>
        </Container>
      </div>

      {/* 2. Bagian Cerita Kami */}
      <Container as="section" className="my-5 py-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Image 
              src="/imgs/bunga.jpg" 
              alt="Florist merangkai bunga" 
              fluid 
              className="story-image"
            />
          </Col>
          <Col md={6}>
            <h2>Cerita Kami</h2>
            <p className="lead">
              Berawal dari kecintaan yang mendalam terhadap seni merangkai bunga, XFlorist lahir di Tasikmalaya dengan satu mimpi: menjadi bagian dari setiap momen berharga Anda.
            </p>
            <p>
              Kami percaya bahwa setiap tangkai bunga memiliki cerita dan setiap rangkaian adalah sebuah pesan. Oleh karena itu, kami mendedikasikan diri untuk menciptakan karya seni floral yang tidak hanya indah dipandang, tetapi juga menyentuh hati dan menyampaikan perasaan tulus Anda.
            </p>
          </Col>
        </Row>
      </Container>

      {/* 3. Bagian Komitmen Kami */}
      <div className="commitment-section section">
        <Container className="text-center">
          <h2 className="section-title">Komitmen Kami</h2>
          <Row className="mt-5">
            <Col md={4} className="mb-4">
              <FaAward className="commitment-icon" />
              <h4>Kualitas Terbaik</h4>
              <p>Hanya bunga paling segar dan berkualitas premium yang kami gunakan dalam setiap rangkaian.</p>
            </Col>
            <Col md={4} className="mb-4">
              <FaHandHoldingHeart className="commitment-icon" />
              <h4>Sentuhan Personal</h4>
              <p>Kami mendengarkan keinginan Anda untuk menciptakan rangkaian custom yang unik dan personal.</p>
            </Col>
            <Col md={4} className="mb-4">
              <FaRegSmile className="commitment-icon" />
              <h4>Kepuasan Pelanggan</h4>
              <p>Kebahagiaan Anda adalah prioritas utama kami, dari pemesanan hingga bunga tiba di tujuan.</p>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* 4. Bagian Lokasi & Peta */}
      <Container as="section" className="my-5 py-5">
        <h2 className="section-title text-center mb-4">Kunjungi Workshop Kami</h2>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <p className="text-center mb-4">
              <strong>Alamat:</strong> Jl. Cendana No. 12, Kec. Tawang, Kota Tasikmalaya, Jawa Barat 46112
            </p>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.291739527964!2d108.2219706748805!3d-7.321203092690389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f5738a1abc173%3A0x86749e70c5632d43!2sJl.%20Cendana%2C%20Cikalang%2C%20Kec.%20Tawang%2C%20Kab.%20Tasikmalaya%2C%20Jawa%20Barat%2046114!5e0!3m2!1sid!2sid!4v1721905646394!5m2!1sid!2sid" 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}