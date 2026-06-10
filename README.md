# Tamjid Niloy Portfolio CMS

Production-style MERN portfolio CMS with public portfolio, private admin dashboard, JWT authentication, MongoDB Atlas, Cloudinary upload, and deployment-ready structure.

## Stack
- React + Vite
- Tailwind CSS
- Node.js + Express.js
- MongoDB + Mongoose
- Cloudinary
- Vercel frontend
- Render backend

## Run locally

### Server
```bash
cd server
cp .env.example .env
npm install
npm run seed:admin
npm run dev
```

### Client
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

## Important
Never push `.env` files to GitHub.
