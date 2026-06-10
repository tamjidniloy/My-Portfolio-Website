# Backend Local Test Guide

1. Install packages: `cd server && npm install`
2. Create `.env` from `.env.example`
3. Seed admin: `npm run seed:admin`
4. Seed sample content: `npm run seed:sample`
5. Run server: `npm run dev`
6. Test health: `GET http://localhost:5000/api/health`
7. Login: `POST http://localhost:5000/api/auth/login`
8. Use returned token as `Authorization: Bearer <token>` for protected admin routes.
