# 💬 FreelancerReply AI

An AI-powered reply generator built for **social media influencers** to handle client messages professionally.

## What It Does

Influencers paste a client message → select situation & tone → get a **ready-to-send professional reply** in seconds!

##  Features

-  AI-generated replies using grok
- 8+ situation types (Sponsorship, Collaboration, Fan Questions...)
-  6 tone options (Friendly, Professional, Confident...)
-  High Ticket Mode for premium language
-  One-click Copy & Send
-  Reply history saved locally

##  Tech Stack

**Frontend:** React + Vite + Tailwind CSS + Framer Motion  
**Backend:** Node.js + Express.js  
**UI Components:** shadcn/ui + Radix UI

## Installation

### 1. Clone the repo
```bash
git clone https://github.com/sufyanalay/freelancer-reply-ai.git
cd freelancer-reply-ai
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` file in `/server`:
```
GEMINI_API_KEY=your_gemini_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

##  Get Free  API Key

1. Go to https://grok.com/apikey
2. Sign in
3. Click "Create API Key"
4. Paste in `server/.env`

## 📸 Pages

- **Home** — Landing page with features
- **Services** — What the tool offers
- **Tool** — The AI reply generator
- **About** — Project info

## Built By

**Sufyan Ali** — Full Stack Developer  
