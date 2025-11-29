// Simple API client with Authorization support and a localStorage-backed mock fallback.
// Save / overwrite this file at: src/api/client.js
//
// How to use:
// - Set API_BASE below to your Railway backend URL (no trailing slash), e.g.
//     export const API_BASE = "https://your-app.railway.app";
// - When calling get/post from admin code, pass authType = "admin"
//   When calling supplier endpoints, pass authType = "supplier"
// - If API_BASE is empty, the client uses localStorage mocks so you can test without a real backend.

// Replace this line in your existing src/api/client.js:
export const API_BASE = ""; // mock mode — frontend uses localStorage mocks so you can test without backend

function buildUrl(path) {
  if (!API_BASE) return path;
  return `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function getStoredToken(authType) {
  if (authType === "admin") return localStorage.getItem("rrnagar_admin_token");
  if (authType === "supplier") return localStorage.getItem("rrnagar_supplier_token");
  // fallback: prefer admin token then supplier token
  return localStorage.getItem("rrnagar_admin_token") || localStorage.getItem("rrnagar_supplier_token") || null;
}

async function fetchJson(path, { method = "GET", body, authType = null, headers = {}, ...fetchOpts } = {}) {
  const url = buildUrl(path);

  // If no API_BASE (mock mode), route to mock handlers below
  if (!API_BASE) {
    return mockHandler(path, { method, body });
  }

  const token = getStoredToken(authType);
  const mergedHeaders = { "Content-Type": "application/json", ...headers };
  if (token) mergedHeaders["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers: mergedHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...fetchOpts,
  });

  if (!res.ok) {
    const txt = await res.text();
    const err = new Error(`Request failed ${res.status}: ${txt || res.statusText}`);
    err.status = res.status;
    throw err;
  }

  // parse JSON if possible
  const text = await res.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return {};
  }
}

// Public helpers
export async function get(path, authType = null, opts = {}) {
  return fetchJson(path, { method: "GET", authType, ...opts });
}

export async function post(path, body = {}, authType = null, opts = {}) {
  return fetchJson(path, { method: "POST", body, authType, ...opts });
}

/* -------------------------
   MOCK FALLBACK (localStorage)
   -------------------------
   If you don't set API_BASE, this client will persist mock records in localStorage.
   This makes it easy to test admin/supplier flows without a real backend.
*/
async function mockHandler(path, { method, body }) {
  // small simulated latency
  await new Promise((r) => setTimeout(r, 250));

  // Admin login mock
  if (path.includes("/admin/login") && method === "POST") {
    // Accept demo admin credentials: admin / password
    const { username, password } = body || {};
    if (username === "admin" && password === "password") {
      return { ok: true, token: "admin-demo-token" };
    }
    // mimic 401-ish behavior
    const err = new Error("Invalid admin credentials (demo)");
    err.status = 401;
    throw err;
  }

  // Supplier login mock
  if (path.includes("/supplier/login") && method === "POST") {
    const { email, password } = body || {};
    if (!email || !password) {
      const err = new Error("Missing credentials");
      err.status = 400;
      throw err;
    }
    return { ok: true, token: "supplier-demo-token" };
  }

  // Partner requests
  if (path.includes("/partner-requests") && method === "POST") {
    const key = "mock_partner_requests";
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    const id = Date.now();
    const item = { id, ...(body || {}), created_at: new Date().toISOString() };
    arr.push(item);
    localStorage.setItem(key, JSON.stringify(arr));
    return { ok: true, id };
  }

  // Admin products
  if (path.includes("/admin/products")) {
    if (method === "GET") {
      const products = JSON.parse(localStorage.getItem("mock_products") || "[]");
      if (products.length === 0) {
        const seed = [
          { id: 101, title: "Rice (5kg)", price: "₹400" },
          { id: 102, title: "Flowers Bouquet", price: "₹250" },
        ];
        localStorage.setItem("mock_products", JSON.stringify(seed));
        return { ok: true, data: seed };
      }
      return { ok: true, data: products };
    }
    if (method === "POST") {
      const arr = JSON.parse(localStorage.getItem("mock_products") || "[]");
      const id = Date.now();
      const item = { id, ...(body || {}), created_at: new Date().toISOString() };
      arr.push(item);
      localStorage.setItem("mock_products", JSON.stringify(arr));
      return { ok: true, item };
    }
  }

  // Admin users
  if (path.includes("/admin/users") && method === "GET") {
    const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
    if (users.length === 0) {
      const seed = [
        { id: 1, name: "Suresh", email: "suresh@example.com" },
        { id: 2, name: "Meena", email: "meena@example.com" },
      ];
      localStorage.setItem("mock_users", JSON.stringify(seed));
      return { ok: true, data: seed };
    }
    return { ok: true, data: users };
  }

  // Admin orders
  if (path.includes("/admin/orders") && method === "GET") {
    const orders = JSON.parse(localStorage.getItem("mock_orders") || "[]");
    if (orders.length === 0) {
      const seed = [
        { id: 9001, user: "Suresh", total: "₹400", status: "Pending" },
        { id: 9002, user: "Meena", total: "₹250", status: "Delivered" },
      ];
      localStorage.setItem("mock_orders", JSON.stringify(seed));
      return { ok: true, data: seed };
    }
    return { ok: true, data: orders };
  }

  // Supplier products
  if (path.includes("/supplier/products") && method === "GET") {
    const products = JSON.parse(localStorage.getItem("mock_products") || "[]");
    return { ok: true, data: products };
  }

  // Default echo fallback
  return { ok: true, data: body || null };
}