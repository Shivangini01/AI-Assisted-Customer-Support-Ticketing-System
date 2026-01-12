# Backend Development Prompt

## Project Overview
You are tasked with building the backend for an **AI-Assisted Customer Support Ticketing System**. The application is a **Modular Monolith** built with **Java 17** and **Spring Boot 3.3.x**. It exposes a REST API for a React frontend and uses **PostgreSQL** for persistence.

## Architecture
- **Layered Architecture**: Controller -> Service -> Repository -> Database.
- **Modular Structure**: Group code by feature (e.g., `auth`, `ticket`, `ai`, `sla`), not just by layer.
- **Security**: Stateless JWT Authentication using Spring Security 6.

## Technology Stack
- **Language**: Java 17
- **Framework**: Spring Boot 3.3.0+
- **Database**: PostgreSQL (Use H2 for dev if preferred, but Prod is Postgres).
- **ORM**: Spring Data JPA / Hibernate.
- **Testing**: JUnit 5, Mockito.
- **Documentation**: Swagger/OpenAPI (SpringDoc).

## Key Modules & Features to Implement

### 1. Authentication (`com.support.system.auth`)
- **Entities**: `User`, `Role`.
- **Flow**:
    - `POST /api/auth/register`: Create user with default role `ROLE_CUSTOMER`.
    - `POST /api/auth/login`: Validate credentials -> Return JWT in response body.
- **Security Config**: Disable CSRF, enable CORS (localhost:5173), stateless session.

### 2. Ticket Management (`com.support.system.ticket`)
- **Entity**: `Ticket` (id, title, description, status, priority, category, createdBy, slaDueDate, aiFields...).
- **Enums**: `TicketStatus` (OPEN, RESOLVED...), `TicketPriority` (LOW, HIGH...), `TicketCategory`.
- **Endpoints**:
    - `GET /api/tickets`: List all (Admin/Agent) or Filter by assigned.
    - `GET /api/tickets/my`: List tickets created by the logged-in user (Customer).
    - `POST /api/tickets`: Create new ticket.
    - `PATCH /api/tickets/{id}/status`: Update status.
    - `POST /api/tickets/{id}/comments`: Add comment.

### 3. AI Service (`com.support.system.ai`)
- **Async Processing**: Use `@Async` or `CompletableFuture`.
- **Logic**: When a ticket is created:
    - Simulate an LLM call (Thread.sleep).
    - Analyze `description` for keywords.
    - Update `aiSuggestedCategory` and `aiSentiment`.
    - Save updates to the Ticket entity.

### 4. SLA Service (`com.support.system.sla`)
- **Logic**: Calculate `slaDueDate` based on `Priority` at creation time.
    - Critical = +1 hr, High = +4 hrs, etc.
- **Scheduled Task**: A `@Scheduled` job checking for: `now > slaDueDate AND status != CLOSED/RESOLVED`.
    - If breached, update status to `ESCALATED` (or flag it).

## Database Schema (PostgreSQL)
- **Users**: `id`, `username`, `email`, `password`, `roles`.
- **Tickets**: `id`, `title`, `description`, `status`, `priority`, `created_by`, `sla_due_date`, `ai_suggested_category`.
- **Comments**: `id`, `ticket_id`, `text`, `author`, `timestamp`.

## Development Guidelines
- Use **Lombok** for boilerplate.
- Use **DTOs** (Data Transfer Objects) for API Request/Response. Do not expose Entities directly.
- Handle Exceptions globally (`@ControllerAdvice`) -> Return standard Error DTO.
- Ensure `application.properties` supports both H2 (for tests) and PostgreSQL.

## Immediate Task
Initialize the Spring Boot project and implement the **Authentication Module** first.
