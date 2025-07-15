import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = {};

app.get('/', (req, res) => {
  res.send('Smart URL Shortener Backend is running!');
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

  res.json({ shortUrl, qrCode });
});

app.get('/:shortId', (req, res) => {
  const longUrl = db[req.params.shortId];
  if (longUrl) return res.redirect(longUrl);
  res.status(404).send('URL not found');
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
