# AI-Assisted Customer Support Ticketing System

A full-stack support ticketing solution featuring automated ticket categorization, priority assignment, and sentiment analysis using AI simulations. Built with a Spring Boot backend and React frontend.

## 🚀 Features

- **Ticket Management**: Create, update, and track support tickets.
- **AI Integration**:
  - Automated labeling (Category & Priority).
  - Sentiment analysis of ticket descriptions.
- **SLA Tracking**: Automated due date calculation based on ticket priority.
- **Role-Based Access**: Secure login for Admins and Standard Users.
- **Interactive UI**: Dashboard with real-time feedback and filtering.

## 🛠 Tech Stack

- **Backend**: Java 17, Spring Boot 3, PostgreSQL, Spring Security (JWT), Spring Data JPA.
- **Frontend**: React 18, Vite, Axios, CSS Modules.
- **DevOps**: Docker, Docker Compose, Jenkins CI/CD, Nginx (Reverse Proxy).

## ⚙️ Quick Start (Docker)

1.  **Clone the repository**.
2.  **Configure Environment**:
    - Copy `.env.example` to `.env`.
    - Update credentials in `.env` if necessary.
3.  **Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```
4.  **Access the Application**:
    - Frontend: [http://localhost](http://localhost) (via Nginx Proxy)
    - Backend API: `http://localhost/api`
    - API Documentation: [http://localhost/api/swagger-ui/index.html](http://localhost/api/swagger-ui/index.html) (Check Nginx proxy config if direct access is blocked)

## 🧪 Testing

- **Backend**:
  ```bash
  cd backend
  mvn test
  ```
- **Frontend**:
  ```bash
  cd frontend
  npm test
  ```

## 📄 Documentation

- [Deployment Steps](./deployment_steps.md)
- [API Documentation (Swagger)](http://localhost:8080/swagger-ui/index.html) (Requires backend running locally or port forwarded)
