// Admin-side API wrapper that uses the client and sends admin auth where appropriate.
// Save as: src/admin/api.js

import { get, post } from "../api/client";

export async function fetchStats() {
  const res = await get("/admin/stats", "admin");
  return (res && res.data) || { users: 0, products: 0, orders: 0 };
}

export async function fetchUsers() {
  const res = await get("/admin/users", "admin");
  return (res && res.data) || [];
}

export async function fetchProducts() {
  const res = await get("/admin/products", "admin");
  return (res && res.data) || [];
}

export async function createProduct(payload) {
  const res = await post("/admin/products", payload, "admin");
  return res.item || res.data || res;
}

export async function deleteProduct(productId) {
  // Mock client doesn't have a delete route; we emulate remove via localStorage when API_BASE is empty.
  // If you have a real backend add DELETE /admin/products/:id and update client/server accordingly.
  const res = await post(`/admin/products/delete`, { id: productId }, "admin");
  return res;
}

export async function fetchOrders() {
  const res = await get("/admin/orders", "admin");
  return (res && res.data) || [];
}

export async function fetchPartnerRequests() {
  const res = await get("/partner-requests", "admin");
  return (res && res.data) || [];
}

export async function markPartnerRequestReviewed(id) {
  // Mock: mark reviewed by storing a reviewed flag. If you have real API, replace with PUT/PATCH.
  const res = await post("/partner-requests/review", { id }, "admin");
  return res;
}