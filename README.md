# Rajendra Kumar Kushwaha — MERN Stack Portfolio

A premium, fully responsive MERN Stack Developer Portfolio with admin dashboard, MongoDB integration, JWT authentication, and contact form with email notifications.

---

## 🚀 Tech Stack

**Frontend:** React.js (Vite) · Tailwind CSS · Framer Motion · React Router DOM · Axios  
**Backend:** Node.js · Express.js · MongoDB Atlas · Mongoose · JWT · Nodemailer

---

## 📁 Project Structure

```
port/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/
│       │   ├── sections/   # Hero, About, Skills, Projects, Education, Experience, GitHubStats, Contact
│       │   ├── ui/         # Navbar, Footer, SectionWrapper
│       │   └── admin/      # AdminLogin, AdminDashboard
│       ├── pages/          # Home, Admin, NotFound
│       ├── context/        # ThemeContext, AuthContext
│       ├── hooks/          # useScrollProgress
│       └── services/       # api.js (Axios)
└── backend/           # Node.js + Express API
    ├── controllers/    # auth, project, skill, contact, admin
    ├── routes/         # auth, projects, skills, contact, admin
    ├── models/         # User, Project, Skill, Message, Achievement
    ├── middleware/     # auth.js, error.js
    ├── config/         # db.js
    └── utils/          # seed.js
```

---

## ⚙️ Setup & Installation

### 1. Clone & Install

```bash
# Backend
cd backend
npm install
cp .env.example .env   # Fill in your values

# Frontend
cd ../frontend
npm install
cp .env.example .env
```

### 2. Configure Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/portfolio
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=your@gmail.com
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_USERNAME=rajendrakumar23
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

### 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:5000  
Admin Panel: http://localhost:5173/admin

---

## 🔐 Admin Credentials (after seeding)

- **Email:** admin@portfolio.com  
- **Password:** Admin@123

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Push to GitHub → Import in Vercel
# Set env: VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend → Render

1. Push backend to GitHub
2. Create new Web Service on Render
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add all environment variables from `.env`

### MongoDB → Atlas

1. Create free cluster at mongodb.com/atlas
2. Add IP `0.0.0.0/0` to Network Access
3. Copy connection string to `MONGO_URI`

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | — | Admin login |
| GET | /api/auth/me | JWT | Get current user |
| GET | /api/projects | — | Get all projects |
| POST | /api/projects | Admin | Create project |
| PUT | /api/projects/:id | Admin | Update project |
| DELETE | /api/projects/:id | Admin | Delete project |
| GET | /api/skills | — | Get all skills |
| POST | /api/contact | — | Send message |
| GET | /api/contact | Admin | Get all messages |
| GET | /api/admin/stats | Admin | Dashboard stats |

---

## ✨ Features

- 🎨 Glassmorphism UI with dark/light mode
- ⚡ Smooth Framer Motion animations
- 📱 Fully responsive (mobile-first)
- 🔐 JWT-secured admin dashboard
- 📧 Contact form with Nodemailer
- 🗄️ MongoDB Atlas cloud database
- 📊 GitHub stats integration
- 🔄 Scroll progress bar
- 🌐 SEO optimized

---

**Developer:** Rajendra Kumar Kushwaha · Punjab Technical University · Roll: 2207792
