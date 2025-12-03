import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import PartnerUs from './pages/PartnerUs';
import Help from './pages/Help';
import FAQs from './pages/FAQs';

function NotFound() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/partner" element={<PartnerUs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
