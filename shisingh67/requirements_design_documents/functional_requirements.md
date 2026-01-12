# Functional Requirements Document
## AI-Assisted Customer Support Ticketing System

**Version:** 1.0
**Date:** 2026-01-12
**Status:** DRAFT

---

### 1. Introduction
This document describes the functional requirements for the AI-Assisted Customer Support Ticketing System. It details the specific behaviors, functions, and interactions that the system must support to meet the business goals.

---

### 2. User Roles and Permissions

#### 2.1 Customer
- **Register/Login**: Create an account and authenticate.
- **Create Ticket**: Submit new support requests.
- **View My Tickets**: Access a list of own tickets.
- **View Ticket Details**: See status, comments, and updates on own tickets.
- **Add Comment**: Reply to agents on own tickets.
- **Close Ticket**: Mark own ticket as resolved/closed (optional, usually agent driven but good for self-resolution).

#### 2.2 Support Agent
- **Login**: Authenticate into the agent dashboard.
- **View Ticket Queue**: Access Assigned and Unassigned tickets.
- **Update Ticket**: Change status, priority, or category.
- **Internal/External Comments**: Add comments visible to customer (Public) or only other agents (Internal - Future Scope).
- **Use AI Assistance**: View and apply AI-suggested responses or categories.

#### 2.3 Support Manager
- **All Agent Permissions**: Inherits agent capabilities.
- **Dashboard**: View overall system health (SLA breaches, ticket volume).
- **Escalation Management**: Handle escalated tickets.

#### 2.4 Administrator
- **User Management**: Manage user accounts and roles.
- **System Configuration**: Configure SLA rules (future scope).

---

### 3. Detailed Functional Requirements

#### 3.1 Authentication & Authorization Module
| ID | Requirement | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-01** | User Registration | System shall allow new users to register as "Customer". | User can submit email/password/name; User is created in DB. |
| **FR-02** | User Login | System shall authenticate users via Email/Password. | Valid credentials return JWT; Invalid returns error. |
| **FR-03** | Role Enforcement | System shall restrict access to APIs based on roles. | Customer cannot access `/admin` endpoints. |

#### 3.2 Ticket Management Module
| ID | Requirement | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-04** | Create Ticket | User shall be able to create a ticket with Title, Description, and Priority. | Ticket is saved; default status is `OPEN`; assigned unique ID. |
| **FR-05** | View Ticket List | Users shall see a paginated list of tickets relevant to them. | Customers see only theirs; Agents see all/assigned. |
| **FR-06** | Update Status | Agents shall be able to transition ticket status. | Valid transitions: `OPEN` -> `IN_PROGRESS` -> `RESOLVED`. |
| **FR-07** | Add Comment | Users and Agents shall be able to add text comments to a ticket. | Comment is appended to ticket history with timestamp and author. |

#### 3.3 AI Capabilities Module
| ID | Requirement | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-08** | Auto-Categorization | System shall analyze ticket description up on creation to suggest a category. | Ticket `aiSuggestedCategory` field is populated. |
| **FR-09** | Priority Prediction | System shall analyze sentiment to suggest priority. | Keywords like "urgent" trigger `HIGH` priority suggestion. |
| **FR-10** | Sentiment Analysis | System shall tag the ticket with a sentiment score/label. | Ticket `aiSentiment` is set (e.g., "NEGATIVE", "NEUTRAL"). |

#### 3.4 SLA & Escalation Module
| ID | Requirement | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-11** | SLA Calculation | System shall calculate `DueDate` based on Priority when ticket is created. | Critical = 1h, High = 4h, Medium = 24h, Low = 48h. |
| **FR-12** | Breach Detection | System shall identify tickets that have passed `DueDate` without resolution. | Tickets past due are visually flagged in UI. |
| **FR-13** | Visual Indicators | Dashboard shall show SLA status (Safe, Warning, Breached). | UI displays countdown or "Overdue" badge. |

#### 3.5 Dashboard & Reporting Module
| ID | Requirement | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-14** | Customer Dashboard | Display active and closed tickets for the logged-in user. | List is filtered by `createdBy == currentUser`. |
| **FR-15** | Agent Dashboard | Display "My Assigned Tickets" and "Unassigned Queue". | Filterable list view; SLA indicators visible. |
| **FR-16** | Admin View | View all tickets in system. | No restrictions on ticket visibility. |

---

### 4. Data Requirements
- **Ticket Data**: Must persist Title, Description, Status, Priority, Creator, assignee (optional), and timestamps.
- **Audit Trail**: Changes to Status must be logged (implied via `updatedAt` or separate audit log).

### 5. Interface Requirements
- **Web Interface**: Responsive HTML5/CSS3 application accessible via standard web browsers.
- **API**: RESTful API returning JSON responses.

