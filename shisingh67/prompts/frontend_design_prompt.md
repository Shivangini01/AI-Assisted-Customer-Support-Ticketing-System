# Frontend Development Prompt

## Project Overview
You are tasked with building the frontend for an **AI-Assisted Customer Support Ticketing System**. The backend (Spring Boot) is ready, and we need a modern, responsive Single Page Application (SPA) using **React** and **Vite**.

## Technology Stack
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS Modules or Tailwind CSS (Prefer standard CSS Modules for maintainability unless specified otherwise).
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6
- **State Management**: React Context API + Hooks (or Redux Toolkit if complex).
- **Icons**: Lucide React

## Design Aesthetics
- **Theme**: Professional, clean, and "trustworthy" (Blues, Whites, Grays).
- **UI/UX**:
    - **Dashboard**: Card-based layout for tickets.
    - **Indicators**: Color-coded badges for Priority (Red=Critical) and Status (Green=Open).
    - **Responsiveness**: Mobile-friendly views for all pages.

## Key Features to Implement

### 1. Authentication
- **Login Page**: Email & Password form. Calls `POST /api/auth/login`. Stores JWT in localStorage.
- **Register Page**: Name, Username, Email, Password. Calls `POST /api/auth/register`.
- **Protected Routes**: Redirect unauthenticated users to Login.

### 2. Dashboard (Role-Based)
- **Ticket List**: Fetch from `GET /tickets` (for Admin/Agent) or `GET /tickets/my` (for Customer).
- **Create Ticket Modal**: Form with Title, Category (Dropdown), Priority (Dropdown), Description. Calls `POST /api/tickets`.
- **SLA Indicators**: Show "Due in X hours" or "Overdue" based on `slaDueDate`.

### 3. Ticket Detail View
- **Info Panel**: Show Status, Priority, Category, and AI Suggestions.
- **Comments Section**: List history of comments.
- **Add Comment**: Text area to post new reply via `POST /api/tickets/{id}/comments`.
- **Status Update**: Dropdown for Agents to change status (e.g., OPEN -> RESOLVED).

### 4. AI Integration (UI)
- Display **AI Suggested Category** and **Sentiment** on the ticket card/detail.
- **Agent Assist**: If the user is an AGENT, show a "Generate Response" button that fills the comment box (Mock this for now if API user is not ready).

## API Integration Details
- Base URL: `http://localhost:8080/api`
- **Auth Header**: `Authorization: Bearer <token>`
- Handle **401 Unauthorized** by redirecting to Login.
- Handle **403 Forbidden** by showing an error message.

## Directory Structure
```
src/
  components/    # Reusable UI (Navbar, TicketCard, Badge)
  pages/         # Full pages (Login, Dashboard, TicketDetail)
  context/       # AuthContext
  services/      # api.js (Axios setup)
  hooks/         # Custom hooks (useTickets)
  assets/        # Images/Styles
  App.jsx        # Routes
```

## Immediate Task
Start by setting up the project structure, the `AuthContext`, and the `Login` page. Then proceed to the `Dashboard` with the Ticket List.
