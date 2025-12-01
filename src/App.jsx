import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // adjust if your home path differs
import Products from './pages/Products'; // expects src/pages/Products.jsx to exist

// Lightweight NotFound component included so this file is copy-paste ready.
// If you already have a NotFound page, you can remove this and import it instead.
function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* add other routes here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}