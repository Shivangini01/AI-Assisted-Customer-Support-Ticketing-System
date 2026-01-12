# High Level Design (HLD) Document
## AI-Assisted Customer Support Ticketing System

---

### 1. Introduction

#### 1.1 Purpose
The purpose of this High Level Design (HLD) document is to provide a comprehensive architectural overview of the AI-Assisted Customer Support Ticketing System. It outlines the system's structural components, their interactions, and the technology choices made to meet the requirements defined in the Business Requirements Document (BRD).

#### 1.2 Scope
This document covers the high-level architecture of the web application, including the Frontend Single Page Application (SPA), the Backend API, the Database schema, and integrations with AI services.

---

### 2. System Architecture

#### 2.1 Architectural Pattern
The system follows a **Layered Architecture** within a **Modular Monolith** deployment style.
- **Presentation Layer (Frontend)**: React-based Single Page Application.
- **Application Layer (Backend)**: Spring Boot REST API handling business logic.
- **Data Layer (Storage)**: PostgreSQL relational database.

#### 2.2 System Context Diagram

```mermaid
graph TD
    User[End User (Customer/Agent/Admin)] -->|HTTPS / REST| Frontend[React Frontend]
    Frontend -->|REST API| Backend[Spring Boot Backend]
    Backend -->|JDBC| DB[(PostgreSQL Database)]
    Backend -.->|API Call (Async)| AI[AI Service / LLM Provider]
    
    subgraph "Internal System Boundary"
        Frontend
        Backend
        DB
    end
```

---

### 3. Key Components & Modules

#### 3.1 Frontend Subsystem
- **Technology**: React, Vite, Axios, React Context API.
- **Components**:
    - **Auth Module**: Handling Login, Registration, and JWT storage.
    - **Dashboard**: Role-specific views (Customer vs. Agent vs. Admin).
    - **Ticket Interface**: Forms for creating tickets and a detail view for managing lifecycle (comments, status).
    - **AI Widgets**: UI components for displaying suggestions and sentiment analysis.

#### 3.2 Backend Subsystem
- **Technology**: Java 17, Spring Boot 3.3, Hibernate/JPA.
- **Core Modules**:
    - **Auth Controller**: Validates credentials and issues JWTs.
    - **Ticket Controller**: Manages ticket CRUD and state transitions.
    - **SLA Service**: Background service that calculates due dates and checks for breaches.
    - **AI Service**: Asynchronous service that mimics (or integrates with) an LLM to analyze ticket content for categorization and priority suggestion.
    - **Notification Service**: (Planned) Handles email/in-app alerts.

#### 3.3 Data Storage
- **Technology**: PostgreSQL.
- **Key Entities**:
    - `User`: Stores credentials and roles.
    - `Role`: RBAC definitions.
    - `Ticket`: Core entity with status, priority, description.
    - `Comment`: History of communication on a ticket.

---

### 4. Data Flow Architecture

#### 4.1 Ticket Creation Flow
1.  **User** submits ticket details via Frontend form.
2.  **Frontend** sends `POST /api/v1/tickets` with JWT.
3.  **Backend** validates input and saves `Ticket` with status `OPEN`.
4.  **Async Event** triggers `AIService`.
    *   AI analyzes text -> Updates `aiSuggestedCategory`, `aiSentiment`.
5.  **SLA Service** calculates `slaDueDate` based on Priority.
6.  **Database** commits transaction.

#### 4.2 Ticket Resolution Flow
1.  **Agent** views ticket on Dashboard.
2.  **Frontend** fetches ticket details (`GET /tickets/{id}`).
3.  **Agent** enters reply (potentially using AI suggestion).
4.  **Backend** saves Comment and updates Status to `RESOLVED`.
5.  **SLA Service** marks SLA as met (if within time).

---

### 5. Technology Stack

| Component | Choice | Justification |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast development, responsive UI, rich ecosystem. |
| **Backend** | Spring Boot (Java) | Enterprise-grade, strong type safety, mature ecosystem for REST APIs. |
| **Database** | PostgreSQL | Robust relational data integrity, reliability. |
| **Security** | Spring Security + JWT | Stateless authentication suitable for SPAs. |
| **AI Integration** | Java CompletableFuture | Asynchronous processing to prevent blocking user requests. |

---

### 6. Non-Functional Requirements Design

#### 6.1 Security
- **Authentication**: JWT (JSON Web Tokens) with expiration.
- **Authorization**: Role-Based Access Control (RBAC) at the Endpoint level (`@PreAuthorize`).
- **Data Protection**: BCrypt hashing for passwords.

#### 6.2 Scalability
- **Stateless Backend**: The API is stateless, allowing for horizontal scaling (adding more backend instances) behind a load balancer in the future.
- **Database**: PostgreSQL can be scaled vertically or via read-replicas.

#### 6.3 Performance
- **Async Processing**: Heavy tasks (AI analysis) are offloaded to background threads to ensure fast API response times.
- **Indexing**: Database columns used for filtering (Status, Assignee) will be indexed.

---

### 7. Future Considerations
- **Real-time Updates**: Integrating WebSockets for live ticket updates without page refresh.
- **Microservices**: Decomposing the "SLA" or "AI" modules into separate services if load increases significantly.
