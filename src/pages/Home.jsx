import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import vchase from '../assets/ads/vchase.png';
import rrnagar from '../assets/ads/rrnagar.png';
import gephyr from '../assets/ads/gephyr.png';
import ichase from '../assets/ads/ichase.png';
import reneevet from '../assets/ads/reneevet.png';

/*
  NOTE:
  - This file restores Header/Footer and keeps the ad grid (images imported so Vite bundles them).
  - Replace the placeholder sections (HERO / DISCOVER / OTHER) below with the exact JSX from your original Home.jsx
    if you want the page restored exactly as before.
*/

const ads = [
  { id: 'vchase', src: vchase, href: '#', alt: 'VChase' },
  { id: 'rrnagar', src: rrnagar, href: '#', alt: 'RR Nagar' },
  { id: 'gephyr', src: gephyr, href: '#', alt: 'Gephyr' },
  { id: 'ichase', src: ichase, href: '#', alt: 'iChase' },
  { id: 'reneevet', src: reneevet, href: '#', alt: 'Reneevet' },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="home-page" style={{ padding: '1rem' }}>
        {/* ===== HERO SECTION (PLACEHOLDER) =====
            Replace this section with your original hero JSX.
            Example structure below — update classes/content to match your original design.
        */}
        <section className="hero-section" style={{ marginBottom: 24 }}>
          <div className="hero-inner" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0 }}>Welcome to RR Nagar</h1>
              <p style={{ marginTop: 8, color: '#444' }}>
                <!-- Replace with original hero subtitle/CTA -->
              </p>
              {/* Example CTA */}
              <div style={{ marginTop: 12 }}>
                <a href="/products" style={{ padding: '10px 16px', background: '#25d366', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>
                  Shop Now
                </a>
              </div>
            </div>
            <div style={{ width: 320 }}>
              {/* Example hero image placeholder */}
              <img src="/assets/rrnagar-E55LE9Sg.png" alt="hero" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* ===== DISCOVER / GRID / OTHER ORIGINAL SECTIONS (PLACEHOLDERS) =====
            Paste your original "discover rrnagar" grid and other sections here.
            For example:
            <section className="discover"> ... your JSX ... </section>
        */}
        <section className="discover-grid" style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 12 }}>Discover RR Nagar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {/* Replace the divs below with your original discover cards */}
            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>Discover card 1</div>
            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>Discover card 2</div>
            <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>Discover card 3</div>
          </div>
        </section>

        {/* ===== AD GRID (kept from current Home) ===== */}
        <section className="ad-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {ads.map(a => (
            <a key={a.id} href={a.href} className="ad-item" style={{ display: 'block', overflow: 'hidden' }}>
              <img src={a.src} alt={a.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </a>
          ))}
        </section>

        {/* ===== OTHER ORIGINAL CONTENT PLACEHOLDER =====
            Add any remaining original sections (featured products, blogs, etc.)
        */}
        <section className="other-home-sections">
          {/* Paste other original JSX here */}
        </section>
      </main>

      <Footer />
    </>
  );
}
