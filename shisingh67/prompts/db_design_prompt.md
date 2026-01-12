You are a Senior Data Architect designing the database for an enterprise-grade web application.

Create a detailed Database Design Document for the following system:

System Name: AI-Assisted Customer Support Ticketing System
Database Engine: PostgreSQL

The document must align with an already approved Business Requirements Document (BRD) and High Level Design (HLD) and be suitable for:
- Backend engineering implementation
- Schema review
- Architecture and data governance approval

The Database Design Document must include the following sections:

1. Overview
   - Purpose of the database
   - Justification for using a relational database (RDBMS)
   - Emphasis on data integrity and ACID properties

2. Entity Relationship Diagram (ERD)
   - Use Mermaid `erDiagram` syntax
   - Include core entities such as:
     - Users
     - Roles
     - User_Roles (join table)
     - Tickets
   - Clearly show relationships and cardinality
   - Include primary keys (PK) and foreign keys (FK)
   - Add a brief explanatory note if any relationship uses loose coupling or application-level integrity

3. Table Definitions
   For each table, provide:
   - Table name
   - Purpose/description
   - Column definitions in a table format with:
     - Column name
     - Data type
     - Constraints (PK, FK, Unique, Not Null, Check/Enum)
     - Description

   Tables to include at minimum:
   - users
   - roles
   - user_roles
   - tickets

   Ticket table must include:
   - Status, priority, and category enums
   - SLA-related fields
   - AI-generated metadata (suggested category, priority, sentiment)

4. Naming Conventions
   - Table naming strategy
   - Column naming strategy
   - Primary key and foreign key conventions

5. Indexing Strategy
   - Unique indexes for authentication-related fields
   - Performance indexes for common query patterns (status, priority, created_by)
   - Forward-looking recommendations for scaling

Formatting Guidelines:
- Use Markdown headings and tables
- Use clear, concise, enterprise-grade language
- Keep schema normalized and implementation-ready
- Avoid code-level ORM details (focus on database design)
- Ensure the document is suitable for direct engineering use

Output:
A complete Database Design Document in Markdown format, including a Mermaid ERD.
