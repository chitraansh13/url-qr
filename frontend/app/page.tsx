'use client';
import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [aiPreview, setAiPreview] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await res.json();

      setShortUrl(data.shortUrl);
      setQrCode(data.qrCode);
      setAiPreview(data.aiPreview);
    }

    catch (err) {
      console.error('Error shortening URL:', err);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      <h1 className="text-7xl pb-10 font-bold text-pink-400 drop-shadow-lg">Smart URL Shortener</h1>
      <p className="pt-4 pb-24 text-xl text-indigo-200">Enter a long URL to get a short URL and QR code.</p>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL"
        className="text-center px-8 py-4 rounded-xl w-96 text-gray-900 mb-8 bg-white/90 shadow-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />
      <button
        onClick={handleSubmit}
        className="px-10 py-4 mb-10 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:cursor-pointer text-white font-semibold shadow-lg transition duration-300 "
      >
        Shorten
      </button>
      {shortUrl && (
        <div className="flex flex-col items-center gap-4 bg-white/10 rounded-xl p-8 shadow-lg">
          <p className="text-lg text-pink-300">
            Short URL: <a href={shortUrl} target="_blank" className="underline hover:text-pink-400 transition">{shortUrl}</a>
          </p>
          <img src={qrCode} alt="QR Code" className="w-40 h-40 rounded-lg bg-white p-2 shadow" />
        </div>
      )}
      {aiPreview && <p><strong>AI Summary:</strong> {aiPreview}</p>}
    </main>
  )
}
