import React, { useMemo } from "react";
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
  const navigate = useNavigate();

  const items = useMemo(() => [
    {
      key: "temples",
      icon: "🛕",
      title: "Temples",
      desc: "Spiritual & heritage.",
      longInfo:
        "RR Nagar is home to several well-known temples such as Sri Rajarajeshwari, Sri Muktheertheshwara and Bhuvaneshwari Temple. They host festivals and daily rituals — great for culture and heritage exploration."
    },
    {
      key: "parks",
      icon: "🌳",
      title: "Parks",
      desc: "Green spaces.",
      longInfo:
        "RR Nagar has peaceful green spaces including the Biodiversity Park and many pocket parks — ideal for walks, yoga, and family time."
    },
    {
      key: "itparks",
      icon: "🖥️",
      title: "IT Parks",
      desc: "Tech hubs.",
      longInfo:
        "Close to Global Village Tech Park and other tech clusters, RR Nagar is convenient for IT professionals and startups."
    },
    {
      key: "education",
      icon: "🎓",
      title: "Education",
      desc: "Schools & colleges.",
      longInfo:
        "RR Nagar features reputable schools, PU colleges and coaching centres for competitive exams — a strong educational ecosystem."
    },
    {
      key: "entertainment",
      icon: "🎭",
      title: "Entertainment",
      desc: "Fun places.",
      longInfo:
        "From malls and cinemas to food streets and family entertainment zones, RR Nagar has options for leisure and events."
    }
  ], []);

  // duplicated lists for infinite marquee
  const adsLoop = [...ads, ...ads];
  const itemsLoop = [...items, ...items];

  return (
    <main className="home-container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-image"><img src={heroImg} alt="RR Nagar" /></div>
        <div className="hero-text">
          <h1 className="hero-title">ನಮ್ಮಿಂದ ನಿಮಗೆ — ನಿಮ್ಮಷ್ಟೇ ಹತ್ತಿರ.</h1>
          <p className="hero-sub">From Us To You — As Close As You Need Us.</p>
        </div>
      </section>

      {/* Categories (grid, NOT scrolling) */}
      <section className="popular-cat">
        <h2>Popular Categories</h2>
        <div className="cat-grid">
          <div className="cat-item"><span className="cat-icon">🛒</span><div>Groceries</div></div>
          <div className="cat-item"><span className="cat-icon">🌸</span><div>Flowers</div></div>
          <div className="cat-item"><span className="cat-icon">🐶</span><div>Pet Services</div></div>
          <div className="cat-item"><span className="cat-icon">🚕</span><div>Travels</div></div>
          <div className="cat-item"><span className="cat-icon">🏠</span><div>Home Services</div></div>
          <div className="cat-item"><span className="cat-icon">🍽️</span><div>Restaurants</div></div>
        </div>
      </section>

      {/* Ads (right -> left marquee) */}
      <section className="ad-section" aria-label="Promotions">
        <div className="ad-marquee">
          <div className="ad-track" role="list">
            {adsLoop.map((ad, i) => (
              <div key={i} className="ad-card" role="listitem">
                <a href={ad.href} target="_blank" rel="noreferrer noopener">
                  <img src={ad.src} alt={ad.alt} className="ad-img" />
                </a>
                <div className="ad-name">{ad.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover (left -> right marquee) */}
      <section className="explore-section">
        <h2>Discover RR Nagar</h2>
        <div className="explore-scroll-wrapper" aria-hidden="false">
          <div className="explore-scroll-track" role="list">
            {itemsLoop.map((it, idx) => (
              <ExploreItem
                key={`${it.key}-${idx}`}
                icon={it.icon}
                title={it.title}
                desc={it.desc}
                longInfo={it.longInfo}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
