// src/pages/Home.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import heroImg from "../assets/hero.jpg";
import ad1 from "../assets/ads/ad1.jpg";
import ad2 from "../assets/ads/ad2.jpg";
import ad3 from "../assets/ads/ad3.jpg";
import ad4 from "../assets/ads/ad4.jpg";

import ExploreItem from "../components/ExploreItem";
import "./Home.css";

const ads = [
  { id: 1, href: "https://ichase.in", src: ad1, alt: "Fitness" },
  { id: 2, href: "https://vchase.in", src: ad2, alt: "Marketing" },
  { id: 3, href: "https://rrnagar.com", src: ad3, alt: "Crackers" },
  { id: 4, href: "https://renee.pet", src: ad4, alt: "Pet Care" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function doSearch() {
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
  }

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
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              placeholder="Search RR Nagar shops, services…"
            />
            <button onClick={doSearch}>Search</button>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
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
      <section className="ad-section">
        <div className="ad-marquee">
          <div className="ad-track">
            {[...ads, ...ads].map((ad, index) => (
              <div key={index} className="ad-card">
                <a href={ad.href} target="_blank" rel="noopener noreferrer">
                  <img src={ad.src} alt={ad.alt} className="ad-img" />
                </a>
                <div className="ad-name">{ad.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="explore-section">
        <h2>Discover RR Nagar</h2>
        <div className="explore-grid">
          <ExploreItem icon="🛕" title="Temples" desc="Spiritual & heritage." />
          <ExploreItem icon="🌳" title="Parks" desc="Green spaces." />
          <ExploreItem icon="🖥️" title="IT Parks" desc="Tech hubs." />
          <ExploreItem icon="🎓" title="Education" desc="Schools & colleges." />
          <ExploreItem icon="🎭" title="Entertainment" desc="Fun places." />
        </div>
      </section>

    </main>
  );
}
