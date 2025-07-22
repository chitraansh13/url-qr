import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import fetch from 'node-fetch';
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3001;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

const db = {};

app.get('/', (req, res) => {
  res.send('Smart URL Shortener Backend is running with Gemini!');
});

app.post('/shorten', async (req, res) => {
  let { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const shortId = nanoid(6);
  db[shortId] = url;

  const shortUrl = `http://localhost:${PORT}/${shortId}`;
  const qrCode = await QRCode.toDataURL(url);

  //Get content from the web page
  const getWebContent = async (url) => {
    try {
      const res = await fetch(url);
      const html = await res.text();

      const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || '';
      const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)?.[1] || '';

      return `Title: ${title}\nDescription: ${metaDesc}`;
    } catch (err) {
      return 'Could not fetch webpage content.';
    }
  };

  //Use Gemini AI to summarize the content
  const getAiPreview = async (text) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize this webpage in one line:\n\n${text}`,
      });
      console.log(response.text);
      return response.text.trim();
    } catch (err) {
      console.error("Gemini error:", err);
      return 'AI summary unavailable.';
    }
  };

  const webContent = await getWebContent(url);
  const aiPreview = await getAiPreview(webContent);

  res.json({ shortUrl, qrCode, aiPreview });
});

app.get('/:shortId', (req, res) => {
  const longUrl = db[req.params.shortId];
  if (longUrl) return res.redirect(longUrl);
  res.status(404).send('URL not found');
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});