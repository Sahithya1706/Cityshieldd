# 🏙️ CityShield – Smart City Safety & Civic Issue Platform

CityShield is a **Smart City web platform** designed to help citizens report civic issues, receive real-time safety alerts, and enable authorities to manage urban problems efficiently.

This project is built as part of a **hackathon / smart city initiative** focusing on public safety, waste management, and urban issue tracking.

---

## 🚀 Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication
- Role-ready structure (User / Admin)

### 🚨 City Alerts
- View city-wide safety alerts
- Filter alerts by severity (High / Medium / Low)
- Backend-connected alert system (MongoDB ready)

### 🧹 Waste Collection System
- Raise waste pickup requests
- Location & description based reporting
- User-specific request tracking
- Backend API integration

### 📊 Dashboard
- City safety overview
- Alerts summary
- Ready for analytics & heatmap integration

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS (Custom UI)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- REST APIs

---

## 📁 Project Structure

```text
city-shield/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── server.js
│
└── README.md
