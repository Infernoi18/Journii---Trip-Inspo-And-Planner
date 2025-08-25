# 🌍 Journii – Smart Trip Planner Web App

**Journii** is a full-stack travel planning platform designed to simplify your travel experience. From organizing itineraries to tracking expenses and exploring places, Journii brings your adventures to life—all in one place.

---

## ✨ Key Features

- 🧭 **Trip Planning** Create, manage, and view upcoming and past trips.

- 💸 **Expense Management** Log expenses by category, view budget summaries, and keep track of your spending during trips.

- 📌 **Destination Discovery** Find and save amazing places to visit (cafés, restaurants, landmarks).

- 👥 **Travel Community** Share your travel stories and get inspired by itineraries from fellow travelers.

- 💬 **AI Travel Assistant** Get travel suggestions and itinerary tips from an AI-powered assistant.

---

## 🧰 Tech Stack

### Frontend
- **Next.js (React Framework)**
- **TypeScript**
- **Tailwind CSS** for styling
- **ShadCN/UI** for components
- **tailwindcss-animate** for animations

### Backend
- **Next.js API Routes**
- **MongoDB (with Mongoose)** for the database
- **OpenAI API** for AI-powered features

---

## 📁 Project Structure

journii/
│
├── app/
│   ├── api/                  # Backend API routes
│   ├── (main)/               # Main app pages (dashboard, trips, etc.)
│   └── layout.tsx            # Root layout
│
├── components/
│   ├── ui/                   # Reusable UI components from ShadCN
│   └── providers/            # Context providers (e.g., AuthProvider)
│
├── models/                   # Mongoose schema definitions
│
├── lib/                      # Helper functions and utilities
│
├── public/                   # Static assets
│
├── .env.local                # Environment variables
├── next.config.mjs           # Next.js configuration
└── README.md