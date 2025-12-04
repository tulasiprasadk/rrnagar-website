// src/pages/ProductDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading product...</p>;

  if (!product)
    return <p style={{ padding: "2rem" }}>Product not found.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{product.title}</h1>
      <p style={{ fontSize: "1.1rem" }}>{product.description}</p>

      <h2 style={{ marginTop: "1rem" }}>₹{product.price}</h2>

      <div style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
        <p><b>Category:</b> {product.Category?.name}</p>
        <p><b>Supplier:</b> {product.Supplier?.name}</p>
        <p><b>Delivery Available:</b> {product.deliveryAvailable ? "Yes" : "No"}</p>
      </div>

      <button
        style={{
          marginTop: "2rem",
          padding: "12px 20px",
          background: "#ffcc00",
          border: "none",
          borderRadius: "10px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Contact Supplier
      </button>
    </div>
  );
}
