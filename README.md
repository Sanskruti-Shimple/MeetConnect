# 🤝 MeetConnect - Your Ultimate Interview Preparation Partner

MeetConnect is a premium, full-stack platform designed to help students and professionals prepare for their technical and behavioral interviews. Outfitted with a sleek dashboard, practice resources, and interview tracking, it's the all-in-one solution for career growth.

---

## ✨ Features

- **🚀 Interactive Dashboard**: Get a birds-eye view of your preparation progress and upcoming interviews.
- **📚 Practice Resources**: Access curated interview questions and answers across Frontend, Backend, Fullstack, and Behavioral categories.
- **📅 Interview Tracking**: Keep track of your past and upcoming interviews effortlessly.
- **👤 Profile Management**: Customize your profile and keep your information up to date.
- **🔐 Secure Authentication**: Robust user registration and login system using JWT and Bcrypt.
- **🏢 Modern UI/UX**: Built with Tailwind CSS for a premium, responsive, and aesthetic feel.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js (Vite)
- **State Management**: Redux Toolkit (with Redux Thunk)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT (JSON Web Tokens), Bcrypt.js
- **Environment**: Dotenv for configuration

---

## 📂 Project Structure

```text
MeetConnect/
├── client/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views
│   │   ├── features/    # Redux logic
│   │   └── api/         # Axios configurations
└── server/           # Node.js + Express Backend
    ├── models/       # Mongoose Schemas
    ├── routes/       # API endpoints
    ├── controllers/  # Business logic
    └── middleware/   # Custom middlewares
```

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- MongoDB Atlas account or local MongoDB instance.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/MeetConnect.git
   cd MeetConnect
   ```

2. **Setup Server:**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Start the server:

   ```bash
   npm run dev
   ```

3. **Setup Client:**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the App:**
   Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---
 
## 🔗 Access WebApp Here:

**Link:** https://meet-connect-xi.vercel.app/login 

---

## 📸 Screenshots

<img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/e6de9bfe-ff46-475f-b4fc-a6b88f28a41e" />
