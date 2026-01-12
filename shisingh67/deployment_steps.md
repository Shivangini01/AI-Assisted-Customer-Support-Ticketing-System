# Deployment Steps

This document outlines the steps to deploy the AI Support Ticketing System using Docker and Jenkins.

## 1. Local Deployment (Docker Compose)

The easiest way to run the application locally is using Docker Compose.

### Prerequisites
- Docker & Docker Compose installed.
- Git installed.

### Steps
1.  **Environment Setup**:
    - Locate the `.env.example` file in the root directory.
    - Create a copy named `.env`.
    - Fill in the secure values (Passwords, Secrets).
    ```bash
    cp .env.example .env
    # Edit .env with your favorite editor
    ```

2.  **Start Services**:
    Run the following command in the root directory:
    ```bash
    docker-compose up --build -d
    ```
    This will start:
    - **PostgreSQL Database** (Port 5432)
    - **Backend API** (Port 8080)
    - **Nginx Reverse Proxy** (Port 80 -> Routes to Frontend & Backend)

3.  **Verify**:
    - Open [http://localhost](http://localhost).
    - Login or Register a new user.

4.  **Stop Services**:
    ```bash
    docker-compose down
    ```

## 2. CI/CD Pipeline (Jenkins)

The project includes a `Jenkinsfile` for automated building and testing.

### Prerequisites
- Jenkins Server 2.x or higher.
- Jenkins Agents with:
  - Java 17 & Maven.
  - Node.js 18+.
  - Docker & Docker Compose.

### Configuration
1.  **Create New Pipeline**:
    - Go to Jenkins Dashboard -> New Item -> Pipeline.
2.  **Source Code Management**:
    - Point to your Git repository.
    - Path to Script: `Jenkinsfile`.
3.  **Credentials**:
    - Add Docker Hub credentials with ID `dockerhub-creds` (Username/Password).
    - Add JWT Secret text credential with ID `jwt-secret`.
    - Add DB Password text credential with ID `postgres-password`.
4.  **Run Build**:
    - Trigger "Build Now".
    - The pipeline will:
        - Checkout Code.
        - Run Backend Tests.
        - Build Frontend.
        - Build Docker Images.
        - Push to Docker Registry.
        - (Optional) Deploy via Docker Compose.

## 3. Production Considerations

- **Database**: Use a managed managed PostgreSQL instance (e.g., AWS RDS) instead of the containerized DB for production. Update `POSTGRES_DB` host in `.env`.
- **Secrets**: Inject secrets via your orchestrator (Kubernetes Secrets / Docker Swarm Secrets) rather than a file.
- **SSL/TLS**: Configure Nginx with SSL certificates (Let's Encrypt) in `nginx-proxy.conf`.
