# 🌐 Smart URL Shortener + QR Code Generator

A **Next.js + Express** web application that allows you to:
- 🔗 Shorten long URLs  
- 📷 Generate QR codes instantly  
- 🤖 Get AI-generated link previews & summaries (via Google Gemini API)  

---

## ✨ Features

- **URL Shortening** – Convert long URLs into compact
- **QR Code Generation** – QR codes for each link  
- **AI-Powered Summaries** – Link previews generated via Gemini API  
- **Fast & Responsive** – Built with Next.js for optimized performance  
- **Clean UI** – Minimal, modern, and mobile-friendly  

---

## 🛠 Tech Stack

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,nodejs,express,typescript,javascript,css" />
  </a>
</p>

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/chitraansh13/url-qr.git
cd url-qr
```
### 2️⃣ Setup the Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs the Next.js app at http://localhost:3000

### 3️⃣ Setup the Backend (For AI Summaries)
```bash
cd backend
npm install
```
Create a .env file inside backend/:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```
Run the backend server:

```bash
node index.js
Backend will run at http://localhost:5000 by default.
```

## 🚀 Usage
### Open http://localhost:3000

```
Enter a long URL into the input box

Click Shorten & Generate QR
```


