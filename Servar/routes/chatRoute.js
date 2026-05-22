import express from "express";
import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// 🌐 Website base URL
const WEBSITE_URL = "https://tattoo-studio-rosy.vercel.app";

// 🌐 Fetch website content
const fetchWebsiteData = async () => {
  try {
    const response = await axios.get(WEBSITE_URL, {
      timeout: 10000,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(response.data);
    const allText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 4000);

    return allText;
  } catch (error) {
    console.log("Fetch error:", error.message);
    return null;
  }
};

let websiteData = "";
let lastFetch = 0;
const CACHE_TIME = 60 * 60 * 1000;

const getWebsiteData = async () => {
  const now = Date.now();
  if (!websiteData || now - lastFetch > CACHE_TIME) {
    console.log("🔄 Fetching website...");
    websiteData = await fetchWebsiteData();
    lastFetch = now;
  }
  return websiteData;
};



router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ success: false, error: "Message required" });
    }

    console.log("💬 User:", message);

    const websiteInfo = await getWebsiteData();
    const lowerMsg = message.toLowerCase();

    // 🔗 Check if SPECIFICALLY URL is requested
    let directURL = null;
    let addButton = false;

    if (
      lowerMsg.includes("book") ||
      lowerMsg.includes("appointment") ||
      lowerMsg.includes("slot")
    ) {
      directURL = `${WEBSITE_URL}/booking`;
      addButton = true;
    } else if (
      lowerMsg.includes("contact") ||
      lowerMsg.includes("call") ||
      lowerMsg.includes("reach")
    ) {
      directURL = `${WEBSITE_URL}/contact`;
      addButton = true;
    } else if (
      lowerMsg.includes("portfolio") ||
      lowerMsg.includes("work") ||
      lowerMsg.includes("gallery")
    ) {
      directURL = `${WEBSITE_URL}/portfolio`;
      addButton = true;
    } else if (
      lowerMsg.includes("price") ||
      lowerMsg.includes("cost") ||
      lowerMsg.includes("rate")
    ) {
      directURL = `${WEBSITE_URL}/pricing`;
      addButton = true;
    } else if (lowerMsg.includes("about")) {
      directURL = `${WEBSITE_URL}/about`;
      addButton = true;
    }

    const systemPrompt = `
You are UP 50 Tattoo Studio's website assistant. Answer as the studio.

STUDIO INFO FROM WEBSITE:
${websiteInfo || "Professional tattoo studio. Prices start ₹2,000."}

IMPORTANT RULES:
1. NEVER add any links in your response (no [text](#), no any URL)
2. NEVER say "click here" or "click below" or "below"
3. DON'T include any links or URLs in your answer
4. Just give a plain text answer
5. Be friendly and brief

When user asks about booking/contact/portfolio/pricing:
- Give helpful information in plain text
- The system will automatically add a clickable button for them

Example responses:
- "For booking, call us or visit our studio" (NO LINK)
- "Our prices start from ₹2,000" (NO LINK)
- "Great! We can do your tattoo. Book your slot!" (NO LINK)
`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    let reply = completion.choices[0].message.content;

    // Remove any unwanted links from AI response
    reply = reply
      .replace(/\$.*?\$(#)/g, "")
      .replace(/\$.*?\$\$.*?\$/g, "")
      .trim();

    // 🔗 Only add ONE proper button at end
    if (addButton && directURL) {
      let buttonText = "";

      if (directURL.includes("booking")) {
        buttonText = "📅 Book Appointment";
      } else if (directURL.includes("contact")) {
        buttonText = "📞 Contact Us";
      } else if (directURL.includes("portfolio")) {
        buttonText = "🖼️ View Portfolio";
      } else if (directURL.includes("pricing")) {
        buttonText = "💰 View Pricing";
      }

      // Proper HTML Button
      reply += ` <a href="${directURL}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-top: 10px;">${buttonText}</a>`;
    }

    console.log("🤖 Bot:", reply);

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
