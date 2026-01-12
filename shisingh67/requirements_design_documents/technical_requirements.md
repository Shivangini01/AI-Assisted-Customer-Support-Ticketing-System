# Technical Requirements Document
## AI-Assisted Customer Support Ticketing System


### 1. Introduction
This document outlines the technical requirements, constraints, and standards for the AI-Assisted Customer Support Ticketing System. It facilitates the setup, development, and deployment of the application.

---

### 2. Technology Stack

#### 2.1 Backend
- **Language**: Java 17 (LTS)
- **Framework**: Spring Boot 3.3.x
- **Build Tool**: Apache Maven 3.8+
- **Database Access**: Spring Data JPA (Hibernate)
- **Security**: Spring Security 6.x (OAuth2 Resource Server / JWT)
- **Async Processing**: Java `CompletableFuture` / Spring `@Async`
- **Testing**: JUnit 5, Mockito

#### 2.2 Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+) / TypeScript (Optional but recommended)
- **State Management**: React Context API (with Hooks)
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6
- **Styling**: CSS Modules or Vanilla CSS (Responsive Design)

#### 2.3 Database
- **Primary Database**: PostgreSQL 14+
- **Migration Tool**: None (Schema auto-update via Hibernate `ddl-auto` for MVP; Flyway recommended for Prod).
- **Indexing**: B-Tree indexes on primary and foreign keys.

#### 2.4 Infrastructure & Tools
- **Version Control**: Git
- **Containerization**: Docker (Optional for local dev)
- **API Testing**: Postman / Swagger UI (OpenAPI 3.0)

---

### 3. System Performance & Scalability

- **Response Time**: API endpoints should return within **200ms** for 95% of requests (excluding AI analysis).
- **Concurrency**: Support at least 50 concurrent users for the MVP.
- **Availability**: 99.9% uptime requirement during business hours.
- **Async Handling**: AI analysis tasks must not block the main request thread; they should be processed asynchronously with extensive timeouts (e.g., 5-10 seconds).

---

### 4. Security Requirements

| ID | Requirement | Implementation Strategy |
| :--- | :--- | :--- |
| **TR-SEC-01** | Password Storage | Passwords must represent hashed values using **BCrypt** with a minimum strength of 10. |
| **TR-SEC-02** | API Authentication | All private endpoints must require a valid **JWT** (JSON Web Token) in the `Authorization` header (`Bearer <token>`). |
| **TR-SEC-03** | CORS Policy | Cross-Origin Resource Sharing must be configured to allow requests only from the trusted frontend domain (e.g., `localhost:5173` for dev). |
| **TR-SEC-04** | SQL Injection Prevention | All database queries must use **Parameter Binding** (JPA Repositories) to prevent SQL injection. |
| **TR-SEC-05** | Sensitive Data | API Keys (e.g., OpenAI Key) must **never** be committed to version control; use Environment Variables. |

---

### 5. API Design Guidelines

- **Restfulness**: Use standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Status Codes**: 
  - `200 OK`: Successful synchronous request.
  - `201 Created`: Resource created.
  - `202 Accepted`: Request accepted for async processing (e.g., Ticket created + AI analyzing).
  - `400 Bad Request`: Validation failure.
  - `401 Unauthorized`: Missing/Invalid Token.
  - `403 Forbidden`: Insufficient permissions.
  - `500 Internal Server Error`: Unhandled exception.
- **Payload Format**: JSON (`application/json`).
- **Date Format**: ISO-8601 (`yyyy-MM-dd'T'HH:mm:ss`).

---

### 6. Development Environment Setup

To run the project locally, the developer machine must have:
1.  **JDK 17**: Installed and configured in `PATH`.
2.  **Node.js**: v18 or higher (for Frontend).
3.  **PostgreSQL**: Running locally on port `5432` or via Docker.
4.  **IDE**: IntelliJ IDEA (Backend) and VS Code (Frontend) recommended.

#### 6.1 Configuration
The backend requires an `application.properties` file with:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ai_support_system
spring.datasource.username=postgres
spring.datasource.password=<your_password>
app.jwt.secret=<32_char_random_string>
```

---

### 7. Deployment Constraints
- **Environment**: Application is targeting on-premise or cloud VM deployment (e.g., AWS EC2).
- **Port Mapping**:
    - Frontend: `80` (Prod) / `5173` (Dev)
    - Backend: `8080`
    - Database: `5432`

