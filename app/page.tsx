import Header from "./components/Header";
import Faq from "./components/Faq";
import MouseTrail from "./components/MouseTrail";

const products = [
  { img: "gayo-coffee.jpg", alt: "Gayo Coffee", name: "Robusta Gayo Coffee (Medium Roasted, Honey)", desc: "Nutty and buttery coffee beans from the highlands of Aceh", price: "Rp200.000/kg" },
  { img: "toraja-coffee.jpg", alt: "Toraja Coffee", name: "Arabica Toraja Coffee(Medium Roasted, Washed)", desc: "Rich and earthy coffee beans with a distinctive taste from Sulawesi", price: "Rp325.000/kg" },
  { img: "kintamani-coffee.jpg", alt: "Kintamani Coffee", name: "Arabica Kintamani Coffee(Medium Roasted, Washed)", desc: "Fresh and fruity coffee beans from the mountains of Bali", price: "Rp325.000/kg" },
  { img: "flores-coffee.jpg", alt: "Flores Bajawa Coffee", name: "Robusta Flores Bajawa Coffee(Medium Roasted, Washed)", desc: "Balanced coffee with a warm aroma from Flores, East Nusa Tenggara", price: "Rp200.000/kg" },
  { img: "mandailing-coffee.jpg", alt: "Mandailing Coffee", name: "Arabica Mandailing Coffee (Medium Roasted, Washed)", desc: "Full-bodied coffee with a smooth finish from North Sumatra", price: "Rp330.000/kg" },
  { img: "liberika-coffee.jpg", alt: "Luwak Coffee", name: "Liberika Coffee (Roasted)", desc: "Unique Indonesian coffee with a bold and distinctive character.", price: "Rp500.000/kg" },
];

const partners = [
  "Peternak Kopi Gayo di Aceh",
  "Peternak Kopi Toraja di Sulawesi Selatan",
  "Peternak Kopi Kintamani di Bali",
  "Peternak Kopi Flores Bajawa di NTT",
  "Peternak Kopi Liberika di Kalimantan Timur",
  "Peternak Kopi Mandailing di Sumatera Utara",
  "Amankila Roastery",
  "Do Son Cafe",
  "BDK Roastery",
  "Soneva Cafe",
  "Ladytano Coffee",
  "D'Orsay Coffee",
];

export default function Home() {
  return (
    <>
      <MouseTrail />
      <Header />

      <main>
        <section id="hero">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-label">KOPI NUSANTARA</p>
              <h2>
                Cita Rasa Kopi <span>Indonesia</span>
              </h2>
              <p className="hero-description">
                Menikmati kekayaan kopi Nusantara dari berbagai daerah Indonesia
                dalam setiap tegukan.
              </p>
              <a href="#product" className="hero-button">
                Explore Our Coffee
              </a>
            </div>
            <div className="hero-logo">
              <div className="logo-circle">
                <img src="/assets/logo.png" alt="Logo Kopi Nusantara" />
              </div>
            </div>
          </div>
        </section>

        <section id="product">
          <div className="products-inner">
            <h2>Products</h2>
            <p className="products-subtitle">
              Discover the authentic taste of Indonesian coffee beans, crafted
              with carefully selected beans from across the archpelago.
            </p>
            <div className="products-grid">
              {products.map((p) => (
                <div className="product-card" key={p.img}>
                  <img src={`/assets/${p.img}`} alt={p.alt} />
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <span className="product-price">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="partners-inner">
            <h2>Our Partners</h2>
            <p className="partners-subtitle">
              Bridging farmers, roasters, and avid coffee enjoyers throughout
              Indonesia.
            </p>
            <div className="partners-grid">
              {partners.map((name) => (
                <div className="partner-card" key={name}>
                  <span className="partner-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq />

        <section id="about">
          <div className="about-container">
            <div className="about-intro">
              <div className="about-brand">
                <img src="/assets/logo.png" alt="" width={56} height={56} />
                <p className="about-brand-name">Kopi Nusantara</p>
                <p>The real coffee from Indonesia.</p>
              </div>
              <div className="about-story">
                <p className="about-label">About Us</p>
                <h2 id="about-title">The story behind</h2>
                <p>
                  Indonesia is a country that is full of coffee culture. From
                  the scent till the taste, each region offers a different
                  flavour.
                </p>
                <p>
                  Through Kopi Nusantara, we want to give a chance for many
                  other nations to enjoy the abundance of coffee flavour that is
                  produced by Indonesia. For us, coffee is not just a drink, but
                  it is a chance to talk, know each other, and even relax in the
                  time we have.
                </p>
                <a className="about-link" href="#product">
                  Jelajahi Kopi Kami
                </a>
              </div>
            </div>

            <div className="about-values">
              <div>
                <h3>Know Local Coffee</h3>
                <p>Invite coffee lovers to enjoy Indonesia&apos;s coffees.</p>
              </div>
              <div>
                <h3>How it is Done</h3>
                <p>
                  Learn the process from picking coffee beans until extracting
                  it for a coffee to enjoy.
                </p>
              </div>
              <div>
                <h3>Share a story</h3>
                <p>
                  Enjoying time together through drinking one cup of coffee at a
                  time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        © 2026 Kel-3 Frontend <br />
        Vaibhav Nickson Denzel Catherine Putri. All rights reserved
      </footer>
    </>
  );
}