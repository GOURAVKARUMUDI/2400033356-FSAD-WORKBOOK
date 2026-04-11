# Skill 14 - User Authentication & Session Management

This repository contains a full-stack implementation of the Skill 14 assignment with the required folder structure:

- `frontend/` - React application
- `backend/` - Spring Boot application

## Features

- User registration
- User login with credential validation
- Session persistence using `localStorage` or `sessionStorage`
- Protected Home page
- Profile page that loads full user details from the backend
- Logout that clears stored user data and redirects to Login
- Basic responsive UI styling

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Spring Boot, Spring Web, Spring Data JPA, H2 Database

## Run the Backend

The backend is configured as a standard Maven-based Spring Boot app.

```powershell
cd backend
mvn spring-boot:run
```

If Maven is not installed globally on your machine, install it first or add a Maven wrapper before running.

Backend default URL: `http://localhost:8080`

## Run the Frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Frontend default URL: `http://localhost:5173`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/profile?id={id}&username={username}`

## Session Handling

- When "Keep me signed in" is checked on Login, the app stores the session in `localStorage`.
- When it is unchecked, the app stores the session in `sessionStorage`.
- Logout clears both storages.

