You are a Senior Software Architect designing an enterprise-grade web application.

Create a detailed High Level Design (HLD) document for the following system:

System Name: AI-Assisted Customer Support Ticketing System

The HLD must strictly align with an already approved Business Requirements Document (BRD) and must be suitable for:
- Architecture review
- Backend and frontend implementation
- Technical stakeholder approval

The document should include the following sections and level of detail:

1. Introduction
   - Purpose of the HLD
   - Scope of the design document

2. System Architecture
   - Architectural pattern (e.g., Layered Architecture, Modular Monolith)
   - Justification of the chosen pattern
   - Clear separation of Presentation, Application, and Data layers

3. System Context Diagram
   - Provide a Mermaid diagram
   - Show interactions between:
     - End users
     - Frontend (SPA)
     - Backend (REST API)
     - Database
     - AI / LLM services
   - Clearly mark system boundaries

4. Key Components & Modules
   - Frontend subsystem
     - Technology stack
     - Major UI modules (Auth, Dashboard, Ticket UI, AI widgets)
   - Backend subsystem
     - Technology stack
     - Core modules (Auth, Ticket, SLA, AI, Notification)
     - Responsibilities of each module
   - Data storage
     - Database technology
     - Key entities (User, Role, Ticket, Comment)

5. Data Flow Architecture
   - Ticket creation flow (step-by-step)
   - Ticket resolution flow (step-by-step)
   - Explicit mention of async AI processing

6. Technology Stack
   - Frontend, Backend, Database, Security, AI integration
   - Use a table format with justification for each choice

7. Non-Functional Requirements Design
   - Security (JWT, RBAC, password hashing)
   - Scalability (stateless backend, future horizontal scaling)
   - Performance (async processing, indexing)

8. Future Considerations
   - Real-time updates (WebSockets)
   - Migration to microservices
   - Extensibility considerations

Formatting Guidelines:
- Use Markdown headings and subheadings
- Include Mermaid diagrams where relevant
- Use bullet points and tables for clarity
- Maintain a professional, enterprise architecture tone
- Keep the design implementation-aware but not code-level

Output:
A complete High Level Design (HLD) document in Markdown format.
