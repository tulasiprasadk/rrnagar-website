import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

/**
 * POST /api/send-whatsapp
 * body: { fromName, fromId, subject, body, toNumber? }
 * Supports providers: 'twilio' (default) or 'meta'
 *
 * Env variables (examples in .env.example):
 *  - WHATSAPP_PROVIDER=twilio|meta
 *  - TWILIO_ACCOUNT_SID
 *  - TWILIO_AUTH_TOKEN
 *  - TWILIO_WHATSAPP_FROM (format: whatsapp:+1XXXXXXXXXX)
 *  - WHATSAPP_PHONE_NUMBER_ID (for Meta)
 *  - WHATSAPP_TOKEN (for Meta)
 *  - WHATSAPP_TARGET_NUMBER (target e.164, e.g. +919844007900 or whatsapp:+919844007900)
 */
app.post("/api/send-whatsapp", async (req, res) => {
  try {
    const { fromName, fromId, subject, body: bodyText, toNumber } = req.body;
    const provider = (process.env.WHATSAPP_PROVIDER || "twilio").toLowerCase();

    // target number from request or env
    let target = toNumber || process.env.WHATSAPP_TARGET_NUMBER;
    if (!target) {
      return res.status(400).json({ error: "No target WhatsApp number configured or provided" });
    }

    // Build plain text message with context
    const messageLines = [];
    if (subject) messageLines.push(`Subject: ${subject}`);
    if (fromName) messageLines.push(`From: ${fromName}`);
    if (fromId) messageLines.push(`From ID: ${fromId}`);
    messageLines.push("");
    messageLines.push(bodyText || "");
    const text = messageLines.join("\n");

    if (provider === "twilio") {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_WHATSAPP_FROM;

      if (!sid || !token || !from) {
        return res.status(500).json({ error: "Twilio credentials are not configured" });
      }

      // Ensure "whatsapp:+<number>" format for To
      const to = target.startsWith("whatsapp:") ? target : `whatsapp:${target.startsWith("+") ? target.slice(1) : target}`;

      const params = new URLSearchParams();
      params.append("To", to);
      params.append("From", from);
      params.append("Body", text);

      const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
      const twRes = await axios.post(url, params.toString(), {
        auth: { username: sid, password: token },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return res.json({ success: true, provider: "twilio", data: twRes.data });
    } else if (provider === "meta") {
      const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      const token = process.env.WHATSAPP_TOKEN;
      if (!phoneId || !token) {
        return res.status(500).json({ error: "Meta WhatsApp credentials not configured" });
      }

      // Meta expects E.164 without "whatsapp:" prefix
      const to = target.startsWith("+") ? target : target.replace(/^whatsapp:/, "");
      const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`;
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      };

      const metaRes = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      return res.json({ success: true, provider: "meta", data: metaRes.data });
    } else {
      return res.status(400).json({ error: `Unsupported WHATSAPP_PROVIDER: ${provider}` });
    }
  } catch (err) {
    console.error("send-whatsapp error:", err?.response?.data || err.message || err);
    const message = err?.response?.data || err.message || "unknown error";
    return res.status(500).json({ error: message });
  }
});

app.get("/api/ping", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`WhatsApp relay service listening on http://localhost:${PORT}`);
});