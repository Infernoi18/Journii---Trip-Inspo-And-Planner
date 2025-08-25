# 🌍 Journii – Smart Trip Planner Web App

**Journii** is a full-stack travel planning platform designed to simplify your travel experience. From organizing itineraries to tracking expenses and exploring places, Journii brings your adventures to life—all in one place.

---

## ✨ Key Features

- 🧭 **Trip Planning**  
  Create, manage, and view upcoming and past trips.

- 💸 **Expense Management**  
  Log expenses by category, view budget summaries, and keep track of your spending during trips.

- 📌 **Save & Organize Locations**  
  Add places to visit (cafés, restaurants, landmarks) to your trip maps.

- 💡 **Trip Inspirations**  
  Discover public itineraries from fellow travelers and get inspired.

- 💬 **Integrated Chat Support**  
  (Coming Soon) Get travel suggestions and itinerary tips from an AI-powered assistant.

---

## 🧰 Tech Stack

### Frontend
- React (with Vite)
- Tailwind CSS
- ShadCN/UI Components
- Framer Motion (animations)

### Backend
- Node.js + Express.js
- MongoDB (MongoDB Atlas)
- REST APIs
- (Optional) OpenAI API for AI features

---

## 📁 Project Structure

journii/
│──.env.local
├── client/                  # Frontend React application
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page-level components
│   ├── hooks/                # Custom React hooks
│   ├── App.jsx               # Main app component
│   └── index.html            # Entry HTML
│
├── server/                  # Backend Node.js + Express API
│   ├── controllers/          # Business logic
│   ├── models/               # MongoDB schema definitions
│   ├── routes/               # API routes
│   ├── server.js             # Main backend entry file
│   └── config/               # Database and environment config
│
├── .gitignore
├── README.md
└── package.json             # Root dependencies (if monorepo-style)

