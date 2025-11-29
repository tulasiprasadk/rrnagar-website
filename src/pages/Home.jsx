import "./Home.css";
import heroImg from "../assets/rrnagar_hero.jpg";

export default function Home() {
  return (
    <main className="home-container">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">

        {/* LEFT — IMAGE */}
        <div className="hero-image">
          <img src={heroImg} alt="RR Nagar" />
        </div>

        {/* RIGHT — TEXT */}
        <div className="hero-text">
          <h1 className="hero-title">ನಮ್ಮಿಂದ ನಿಮಗೆ — ನಿಮ್ಮಷ್ಟೇ ಹತ್ತಿರ.</h1>
          <p className="hero-sub">From Us To You — As Close As You Need Us.</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search RR Nagar shops, services, deliveries…"
            />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="popular-cat">
        <h2>Popular Categories</h2>

        <div className="cat-grid">
          <div className="cat-item">Groceries</div>
          <div className="cat-item">Flowers</div>
          <div className="cat-item">Pet Services</div>
          <div className="cat-item">Travels</div>
          <div className="cat-item">Home Services</div>
          <div className="cat-item">Restaurants</div>
        </div>
      </section>

      {/* ================= ADVERTISEMENT SLIDER ================= */}
      <section className="ad-section">
        <div className="ad-track">
          <div className="ad-card">Supermarket Offers</div>
          <div className="ad-card">Festive Flowers Sale</div>
          <div className="ad-card">RR Nagar Cab Discounts</div>
          <div className="ad-card">Pet Care Grooming Week</div>
          <div className="ad-card">Home Cleaning Deals</div>
        </div>
      </section>

      {/* ================= EXPLORE RR NAGAR ================= */}
      <section className="explore-section">
        <h2>Explore RR Nagar</h2>

        <div className="explore-grid">
          <div className="explore-card">
            <h3>Local Shops</h3>
            <p>Explore trusted stores near you.</p>
          </div>

          <div className="explore-card">
            <h3>Services</h3>
            <p>Plumbers, electricians, carpenters & more.</p>
          </div>

          <div className="explore-card">
            <h3>Food & Restaurants</h3>
            <p>Your favourite RR Nagar meals delivered fast.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
