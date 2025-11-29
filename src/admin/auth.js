// Admin auth that uses API client. Save as src/admin/auth.js
import { post } from "../api/client";

const KEY = "rrnagar_admin_token";

export function isAuthenticated() {
  return !!localStorage.getItem(KEY);
}

export function getToken() {
  return localStorage.getItem(KEY);
}

export async function login({ username, password }) {
  // Will call /admin/login on your Railway backend if API_BASE is set.
  // Expects JSON response containing { token: "..." } or similar.
  const res = await post("/admin/login", { username, password }, null);
  // If backend returns token inside res.token or res.accessToken, use it:
  const token = (res && (res.token || res.accessToken)) || null;
  if (token) {
    localStorage.setItem(KEY, token);
    return { ok: true, token };
  }
  // Otherwise if mock returned ok: true, set a demo token
  if (res && res.ok) {
    const demoToken = "admin-demo-token";
    localStorage.setItem(KEY, demoToken);
    return { ok: true, token: demoToken };
  }
  throw new Error("Login failed");
}

export function logout() {
  localStorage.removeItem(KEY);
}