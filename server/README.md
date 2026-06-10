# Package 1: Complete Backend - Portfolio CMS

This backend contains Express.js, MongoDB/Mongoose, JWT authentication, admin seed, profile/project/skill/experience/education/message/settings CRUD, and Cloudinary upload.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your own local values. Do not commit `.env`.

## Run

```bash
npm run seed:admin
npm run seed:sample
npm run dev
```

Server: `http://localhost:5000`
Health: `http://localhost:5000/api/health`

## Core routes

Auth:
- POST `/api/auth/login`
- GET `/api/auth/me`
- POST `/api/auth/logout`

Profile:
- GET `/api/profile`
- PUT `/api/profile` protected

Projects:
- GET `/api/projects`
- GET `/api/projects/admin/all` protected
- GET `/api/projects/:idOrSlug`
- POST `/api/projects` protected
- PUT `/api/projects/:id` protected
- DELETE `/api/projects/:id` protected

Skills, Experiences, Educations follow similar CRUD structure.

Messages:
- POST `/api/messages`
- GET `/api/messages` protected
- PATCH `/api/messages/:id/read` protected
- DELETE `/api/messages/:id` protected

Upload:
- POST `/api/upload` protected, multipart form-data key: `file`
- DELETE `/api/upload` protected

## Important

If you previously exposed MongoDB/Cloudinary credentials, rotate them before using this project.
