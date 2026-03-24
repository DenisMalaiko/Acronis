# 🚀 Deals Management App

A full-stack web application for managing deals with filtering, role-based access control, and modern UI.

---

## How to Run

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

### 2. URLs

#### Frontend
``` http://localhost:5173/ ```

#### Backend
``` http://localhost:3000/ ```

---


## Security Risk


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
