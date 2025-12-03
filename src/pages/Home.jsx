import React from "react";
import heroImg from "../assets/hero.jpg";
import ad1 from "../assets/ads/ad1.jpg";
import ad2 from "../assets/ads/ad2.jpg";
import ad3 from "../assets/ads/ad3.jpg";
import ad4 from "../assets/ads/ad4.jpg";
import ExploreItem from "../components/ExploreItem";
import "./Home.css";

const ads = [
  {
    id: 1,
    href: "https://ichase.in",
    src: ad1,
    alt: "Fitness",
  },
  {
    id: 2,
    href: "https://vchase.in",
    src: ad2,
    alt: "Marketing",
  },
  {
    id: 3,
    href: "https://rrnagar.com",
    src: ad3,
    alt: "Crackers",
  },
  {
    id: 4,
    href: "https://renee.pet",
    src: ad4,
    alt: "Pet Care",
  },
];

export default function Home() {
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <img src={heroImg} alt="RR Nagar" />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">ನಮ್ಮಿಂದ ನಿಮಗೆ — ನಿಮ್ಮಷ್ಟೇ ಹತ್ತಿರ.</h1>
          <p className="hero-sub">From Us To You — As Close As You Need Us.</p>
          <div className="search-box">
            <input type="text" placeholder="Search RR Nagar shops, services…" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="popular-cat">
        <h2>Popular Categories</h2>
        <div className="cat-grid">
          <div className="cat-item"><span className="cat-icon">🛒</span>Groceries</div>
          <div className="cat-item"><span className="cat-icon">🌸</span>Flowers</div>
          <div className="cat-item"><span className="cat-icon">🐶</span>Pet Services</div>
          <div className="cat-item"><span className="cat-icon">🚕</span>Travels</div>
          <div className="cat-item"><span className="cat-icon">🏠</span>Home Services</div>
          <div className="cat-item"><span className="cat-icon">🍽️</span>Restaurants</div>
        </div>
      </section>

      {/* Ads Section */}
      <section className="ad-section" aria-label="Promotions">
        <div className="ad-track" role="list">
          {ads.concat(ads).map((ad, index) => (
            <div key={index} className="ad-card">
              <img src={ad.src} alt={ad.alt} className="ad-img" />
              <a
                href={ad.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ad-name"
                style={{ textDecoration: "none", color: "#c8102e" }}
              >
                {ad.alt}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section className="explore-section">
        <h2>Discover RR Nagar</h2>
        <div className="explore-grid">
          <ExploreItem
            icon="🛕"
            title="Temples"
            desc="Spiritual & heritage sites."
            longInfo="Famous temples: Rajarajeshwari Temple, Bhuvaneshwari Temple, Sri Muktheertheshwara."
          />
          <ExploreItem
            icon="🌳"
            title="Parks"
            desc="Green peaceful spaces."
            longInfo="Biodiversity Park, BDA parks, and community gardens to relax."
          />
          <ExploreItem
            icon="🖥️"
            title="IT Parks"
            desc="Major tech hubs nearby."
            longInfo="Very close to Global Village Tech Park with many IT companies."
          />
          <ExploreItem
            icon="🎓"
            title="Education"
            desc="Schools & colleges."
            longInfo="RR Nagar has top schools, PU colleges and coaching centers."
          />
          <ExploreItem
            icon="🎭"
            title="Entertainment"
            desc="Malls & fun places."
            longInfo="Malls, theatres, events and gaming zones for families."
          />
        </div>
      </section>
    </main>
  );
}
