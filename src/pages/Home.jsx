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

<section className="explore-section">
  <h2>Discover RR Nagar</h2>

  <div className="explore-scroll-wrapper">
    <div className="explore-scroll-track">
      {(() => {
        const items = [
          {
            key: "temples",
            icon: "🛕",
            title: "Temples",
            desc: "Spiritual & heritage.",
            longInfo: "RR Nagar is home to several well-known temples such as the Sri Rajarajeshwari Temple, Sri Muktheertheshwara Temple, and Bhuvaneshwari Temple. These places host daily rituals, cultural festivals, spiritual events, and community gatherings, making them important landmarks of devotion and heritage in the area"
          },
          {
            key: "parks",
            icon: "🌳",
            title: "Parks",
            desc: "Green spaces.",
            longInfo: "RR Nagar has peaceful green spaces including the RR Nagar Biodiversity Park, multiple community parks, and lakeside walking areas. These places are ideal for morning walks, jogging, yoga groups, children’s play zones, and family outings, offering a refreshing escape from city traffic."
          },
          {
            key: "itparks",
            icon: "🖥️",
            title: "IT Parks",
            desc: "Tech hubs.",
            longInfo: "RR Nagar is located close to Global Village Tech Park, which hosts major IT companies and startups. It provides excellent employment opportunities, coworking spaces, training centers, and tech communities, making the neighborhood popular among working professionals."
          },
          {
            key: "education",
            icon: "🎓",
            title: "Education",
            desc: "Schools & colleges.",
            longInfo: "RR Nagar offers access to many reputable schools, PU colleges, degree colleges, and coaching centers. Institutions in the area focus on academics, sports, extracurricular activities, and competitive exam coaching, contributing to a strong learning ecosystem for students of all ages."
          },
          {
            key: "entertainment",
            icon: "🎭",
            title: "Entertainment",
            desc: "Fun places.",
            longInfo: "From malls and theatres to food streets and family entertainment zones, RR Nagar provides a variety of leisure options. Residents enjoy movie nights, shopping, gaming centers, cultural programs, and weekend hangouts across popular spots in and around the neighborhood."
          }
        ];

        const longList = [...items, ...items]; // for infinite loop

        return longList.map((it, i) => (
          <ExploreItem
            key={i}
            icon={it.icon}
            title={it.title}
            desc={it.desc}
            longInfo={it.longInfo}
          />
        ));
      })()}
    </div>
  </div>
</section>





    </main>
  );
}
