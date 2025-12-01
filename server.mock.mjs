// server.mock.mjs - local mock relay for development/testing
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

/**
 * DEV CSP middleware
 * Relax CSP for local development so DevTools / other local requests aren't blocked.
 * In production, remove or tighten this header.
 */
app.use((req, res, next) => {
  // Allow connect to local origins and common dev ports (adjust if needed)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " +
      "connect-src 'self' http://localhost:5001 http://localhost:5173 ws://localhost:5173 http://127.0.0.1:5173; " +
      "img-src 'self' data:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
  );
  next();
});

app.post("/api/send-whatsapp", (req, res) => {
  try {
    const { fromName, fromId, subject, body, toNumber } = req.body || {};
    const target = toNumber || process.env.WHATSAPP_TARGET_NUMBER || "<not-configured>";
    const text = [
      `Subject: ${subject || "(none)"}`,
      `From: ${fromName || "(anonymous)"}`,
      `From ID: ${fromId || "(none)"}`,
      "",
      body || ""
    ].join("\n");
    console.log("MOCK send-whatsapp called. target:", target);
    console.log("MOCK message body:\n", text);
    return res.json({ success: true, provider: "mock", target, messagePreview: text });
  } catch (err) {
    console.error("mock send error", err);
    return res.status(500).json({ error: "mock error" });
  }
});

app.get("/api/ping", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Mock WhatsApp relay service listening on http://localhost:${PORT}`);
});