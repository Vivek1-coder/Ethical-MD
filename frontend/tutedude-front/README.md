# Tutedude Frontend

A modern, full-stack web application built with **Next.js** for healthcare chat and lab report management, featuring authentication, chat with AI, and lab report analysis.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [What Makes Tutedude Unique?](#-what-makes-tutedude-unique)
- [Pages & Features](#pages--features)
- [API Routes](#api-routes)
- [Components](#components)
- [Dependencies](#dependencies)
- [Development Scripts](#development-scripts)
- [Deployment](#deployment)

---

## Project Overview

This project is a healthcare assistant platform where users can:

- Chat with an AI assistant about symptoms.
- Upload and analyze lab reports.
- Manage their health data securely.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `app/` — Main Next.js app directory.
  - `pages/` — Standalone React pages (legacy or for routing).
  - `u/` — User dashboard, chat, and dynamic lab report pages.
  - `components/` — Reusable UI and feature components.
  - `api/` — API route handlers (Next.js API routes).
  - `login/`, `signup/` — Auth pages (Next.js routing).
  - `_lib/` — Utility and service functions.
- `public/` — Static assets.
- `lib/` — General utilities.
- `tutedude-front/` — (empty or legacy, not used in main app).

---

## 🌟 What Makes Tutedude Unique?

Tutedude is not just another healthcare app—it's your **personal AI-powered health companion**!  
Here’s what sets it apart:

---

### 🚀 **Key Features**

- 🤖 **AI Health Chat**: Instantly chat with an intelligent assistant for symptom checks, health advice, and more—24/7!
- 📄 **Lab Report Analyzer**: Upload your lab reports (PDFs) and get clear, actionable insights, summaries, and visualizations.
- 📊 **Personal Health Dashboard**: Track all your reports, view trends, and monitor your health journey in one secure place.
- 🔒 **Secure & Private**: Your data is protected with modern authentication and never shared without your consent.
- 🌈 **Modern, Intuitive UI**: Enjoy a beautiful, responsive interface with 3D visuals, dark mode, and smooth animations.
- 🏥 **Seamless Experience**: From sign-up to chat to report analysis, every step is fast, easy, and user-friendly.

---

### ✨ **Why You'll Love It**

- **All-in-One**: No more juggling apps—get chat, reports, and insights in one place.
- **AI at Your Service**: Get instant, reliable answers and support, anytime.
- **Visual Health Insights**: Understand your health with charts, summaries, and expert-level explanations.
- **Built for You**: Designed for real people, with accessibility and ease-of-use at its core.

---

## Pages & Features

### Main Pages

- **`/` (LandingPage):** Home page with 3D hero and feature highlights.
- **`/login` & `/signup`:** User authentication forms with validation and feedback.
- **`/u` (User Landing):** Entry point for authenticated users, links to chat and dashboard.
- **`/u/chat`:** Main chat interface with AI assistant, quick symptom prompts, and chat history.
- **`/u/dashboard`:** User dashboard for managing and viewing lab reports.
- **`/u/dashboard/[id]`:** Dynamic page to view a specific lab report with metrics, remarks, and insights.
- **`/pages/Chat.jsx`:** (Legacy) Standalone chat page.
- **`/pages/Dashboard.jsx`:** (Legacy) Standalone dashboard.
- **`/pages/NotFound.jsx`:** Custom 404 page.
- **`/pages/Index.jsx`:** Placeholder index page.

### Auth Pages

- **`/login/page.jsx` & `/signup/page.jsx`:** Next.js app router versions of login/signup, using React Hook Form, validation, and API integration.

---

## API Routes

All API routes are in `app/api/` and proxy requests to the backend (`https://med-xplain-backend.onrender.com`):

- **Auth**

  - `POST /api/signin` — User login.
  - `POST /api/signup` — User registration.
  - `POST /api/logout` — Logout, clears token cookie.
  - `GET /api/auth/status` — Returns login status.

- **Chat**

  - `POST /api/chat/query` — Send a message/query to the AI assistant.
  - `POST /api/chat/load-chat` — Load a specific chat session.
  - `POST /api/chat/load-prev-chats` — Load all previous chat sessions.
  - `POST /api/chat/new-session` — Start a new chat session.
  - `DELETE /api/chat/delete-chat` — Delete a chat session.

- **Lab Reports**
  - `POST /api/file-analyze` — Upload and analyze a lab report PDF.
  - `POST /api/load-report/all` — Get all user lab reports.
  - `POST /api/load-report/specific` — Get a specific lab report by ID.

---

## Components

- **UI Components:** Located in `app/components/ui/` (buttons, cards, dialogs, forms, etc.), built with [Radix UI](https://www.radix-ui.com/) and custom styles.
- **Feature Components:** `Hero3D`, `FeatureSection`, `FileUpload`, `LabReport`, etc.
- **Layout Components:** `Navbar`, `Footer`, `ThemeToggle`, etc.

---

## Dependencies

- **Framework & Core:**
  - `next`, `react`, `react-dom`
- **UI & Styling:**
  - `@radix-ui/*` — Accessible UI primitives.
  - `tailwindcss`, `postcss`, `clsx`, `class-variance-authority`
  - `framer-motion` — Animations.
  - `lucide-react`, `react-icons` — Icon libraries.
- **Forms & Validation:**
  - `react-hook-form`, `zod`
- **State & Data:**
  - `@tanstack/react-query` — Data fetching and caching.
  - `axios` — HTTP requests.
- **Charts & Visualization:**
  - `recharts`
- **3D & Visualization:**
  - `three`, `@react-three/fiber`, `@react-three/drei`
- **File Upload:**
  - `react-dropzone`
- **Notifications:**
  - `react-toastify`, `sonner`
- **Other:**
  - `date-fns`, `cmdk`, `embla-carousel-react`, `vaul`, `input-otp`, `react-resizable-panels`, `react-router-dom`
- **Dev Dependencies:**
  - `eslint`, `eslint-config-next`, `@types/*`, `tailwindcss`, `tw-animate-css`

---

## Development Scripts

- `npm run dev` — Start development server.
- `npm run build` — Build for production.
- `npm start` — Start production server.
- `npm run lint` — Lint codebase.

---

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

## Notes

- All API routes require authentication via a token cookie.
- The frontend proxies requests to a remote backend for chat and lab report analysis.
- For more details, see the code in each page/component or the API route handlers.

---
