# 🚀 Deals Management App

A full-stack web application for managing deals with filtering, role-based access control, and modern UI.

---

## Setup

### 1. Run via Docker

#### Start the application
``` docker-compose up -d --build ```

#### End the application
``` docker-compose down ```

### 2. Run Manually

#### Open frontend folder
``` npm run dev ```

#### Open backend folder
``` npm run dev ```

### 3. URLs

#### Frontend
``` http://localhost:5173/ ```

#### Backend
``` http://localhost:3000/ ```

---

## 🧩 Technical Stack

### Frontend

* **Vue 3** – main framework for building UI
* **TypeScript** – type safety and better maintainability
* **Pinia** – state management for predictable and centralized state
* **Vue Router** – client-side routing
* **Vue I18n** – internationalization support
* **@vueuse/core** - utility composables for reactive logic and better code reuse
* **Tailwind CSS** – utility-first styling approach
* **Vue Toastification** – user-friendly notifications


---


## 🏗 Architecture

The application follows a **layered architecture** with clear separation of responsibilities.

---

### 🔌 API Layer

* Located in `shared/api`
* Responsible for all HTTP requests
* Includes centralized error handling and timeout logic (`fetchWithTimeout`)
* Abstracts network logic from the rest of the application

---

### 🧠 State Management (Pinia)

* Located in `app/store`
* Manages global application state:
    * deals list
    * selected deal
    * loading and error states
  
* Implements:
    * caching (TTL-based)
    * polling for real-time updates

* Acts as a bridge between API layer and UI

---

### 🧩 UI Components Layer

* Located in `shared/components`
* Contains reusable and presentation-focused components:
    * table
    * dropdowns
    * chips
    * header

* Components are designed to be stateless and reusable

---

### 📄 Pages (Views)

* Located in `pages`
* Responsible for composing UI and handling user interaction
* Connects UI components with state (Pinia)
* Examples:
    * Deals list page
    * Deal details page
    * Not Found page

---

### 🛠 Shared Utilities & Models

* Located in `shared/const`, `shared/enums`, `shared/types`, and `shared/utils`
* Includes:
    * utility functions (formatting, deduplication, helpers)
    * types and enums
    * constants (languages, users)

* Provides reusable logic across the application

---

### 🧭 Application Core

* Located in `app/`
* Includes:
    * router configuration
    * i18n setup
    * global store initialization

---

### ✅ Key Principles

* **Separation of concerns** – each layer has a single responsibility
* **Reusability** – shared logic and components are centralized
* **Scalability** – structure supports future feature growth
* **Maintainability** – clear boundaries between layers


---

### API Integration

* Native **fetch API**
* Custom API layer for centralized request and error handling
* Timeout handling using `AbortController`

---

### State Management

* **Pinia store**
* Centralized data handling (deals, loading, error states)
* Includes caching (TTL) and polling logic

---

### Styling

* **Tailwind CSS**
* Focus on simplicity, responsiveness, and consistency

---

### DevOps

* **Docker + Docker Compose**
* Separate containers for frontend and backend

---

## 📱 Responsive Design

The application uses **Tailwind CSS** for responsive design.

* Layout is adapted using Tailwind responsive utilities (`sm`, `md`, `lg`)
* Components adjust based on screen size (e.g., filters layout, spacing, table container)
* Flexbox and grid are used for flexible layouts

This approach provides a simple and efficient way to ensure the UI works across different screen sizes.

---


## 🌍 Internationalization (i18n)

The application uses **Vue I18n** for handling multiple languages.

### Implementation

* Translations are defined in separate files per language (e.g., `en.ts`, `de.ts`, `es.ts`, `ja.ts`)
* Messages are structured into logical namespaces (e.g., `General`, `DealsList`, `DealsView`)
* The default locale is set to English with a fallback mechanism

```ts
locale - 'en',
fallbackLocale - 'en'
```

### Usage

* UI text is accessed using translation keys via the `t` function
* This ensures consistent and maintainable localization across the application

### Supported Languages

* English
* German
* Spanish
* Japanese

---

### Conclusion

This approach provides a simple and scalable way to manage translations while keeping the codebase clean and maintainable.

---


## 🔐 Frontend Security

### 🚨 Top 5 Frontend Security Risks

#### 1. Cross-Site Scripting (XSS)

XSS occurs when malicious JavaScript is injected and executed in the user's browser.

**Mitigation:**

* No usage of `v-html`
* All data is rendered via `{{ }}`, which automatically escapes HTML

---

#### 2. Dependency Vulnerabilities

Third-party libraries may contain security vulnerabilities.

**Mitigation:**

* Only well-known and maintained libraries are used
* Dependencies are managed via `package.json`

---

#### 3. Sensitive Data Leakage

Exposure of sensitive data such as tokens, API keys, or personal information.

**Mitigation:**

* No secrets are stored in the frontend code
* `.env` is used only for public variables (`VITE_`)
* Sensitive data is not logged in the console

---

#### 4. Improper Error Handling

Poor error handling can expose internal system details.

**Mitigation:**

* Errors are handled centrally in the API layer
* Users see only generic error messages (via toast notifications)
* Internal error details are not exposed in the UI

---

#### 5. Token Storage Issues

Unsafe storage of tokens (e.g., in localStorage) may lead to token theft.

**Mitigation:**

* Authentication is not implemented (simulation only)
* In real systems, httpOnly cookies are recommended
* The architecture allows safe integration of authentication in the future

---

### 🧠 Security Note

This project implements basic frontend security best practices.
However, in real-world applications it is critical to:

* Validate all input on the backend
* Enforce access control (RBAC) on the server
* Protect APIs from unauthorized access

Frontend alone cannot guarantee application security.


---


## 👨‍💻 Author

Denys Malaiko
