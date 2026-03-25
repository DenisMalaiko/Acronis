# DECISIONS.md

## 1. Architecture Choice

The application follows a **feature-oriented modular architecture** combined with **layer separation**, designed to balance simplicity and scalability.

### Folder Structure Overview

* **/app**

    * `i18n` — localization setup and translations
    * `router` — route configuration and navigation logic
    * `store` — global state management (Pinia)

* **/pages**

    * Feature-level views (e.g., `deals`, `notFound`)
    * Each page represents a route and orchestrates UI + data

* **/shared**

    * Reusable and domain-agnostic logic:

        * `api` — composables for backend communication (`useDealsApi`)
        * `components` — reusable UI components (table, dropdown, chip, etc.)
        * `types` — TypeScript models (Deal, User, Filters)
        * `enums` — domain constants (DealStatus, UserRoles)
        * `const` — static datasets/config
        * `utils` — pure helper functions (fetch, error handling, formatting)

### Architectural Principles

* **Separation of Concerns**

    * UI (components/pages) does not handle API logic directly
    * API logic is isolated in composables
    * State and business logic live in the store

* **Single Responsibility**

    * `fetchWithTimeout` → only networking concern
    * `handleError` → only error transformation
    * `useDealsApi` → only API communication

* **Reusability**

    * Shared components and utilities are centralized under `/shared`
    * Prevents duplication and improves maintainability

* **Scalability-ready**

    * Structure allows easy transition to domain-driven modules if needed

---

## 2. State Management Choice

The application uses **Pinia** for state management.

### Why Pinia

* Native integration with Vue 3 Composition API
* Simple and lightweight compared to Vuex
* Clear structure for async flows (`loading`, `error`, `data`)
* Eliminates prop drilling across pages/components

### How it is used

The store:

* Manages **API calls orchestration**
* Stores:

    * deals list
    * selected deal
    * loading state
    * error state
* Acts as a **single source of truth**

### Design Decision

Instead of calling APIs directly in components:

* Components → call store actions
* Store → calls API composables

This keeps components:

* declarative
* testable
* UI-focused

---

## 3. Scalability Approach

The current implementation is optimized for simplicity and clarity, but it can be extended to support larger datasets and higher complexity.

### Data Fetching & API

* Introduce **server-side pagination, filtering, and sorting** instead of relying on client-side operations.
* Replace the current time-based caching (`lastFetched`) with a more robust solution:

    * request deduplication
    * response caching per query parameters
* Add a centralized API client layer to support:

    * retries
    * request cancellation
    * interceptors (logging, error handling)

---

### State Management

* Split the store into **domain-based modules** (e.g., deals, users, analytics) as the application grows.
* Normalize stored data to avoid duplication and reduce memory usage.
* Avoid storing large datasets entirely in the client state.

---

### UI & Performance

* Introduce **virtualized lists/tables** to efficiently render large datasets.
* Add **debounced inputs** for search and filtering.
* Avoid unnecessary re-renders by limiting reactive dependencies.

---

### Real-time Updates

* Replace polling with more efficient mechanisms such as:

    * WebSockets
    * Server-Sent Events (SSE)

This will reduce server load and provide more responsive updates.

---

### Error Handling & Resilience

* Extend current error handling (timeout + API errors) with:

    * retry logic (with backoff)
    * centralized error mapping (HTTP → i18n messages)
* Ensure consistent behavior across all failure scenarios.

---

## 4. Bottlenecks and Risks

### 1. Data Rendering Performance

Rendering large datasets in the table (using `v-for`) may cause performance issues if the number of deals increases significantly.

**Mitigation:**

* pagination
* virtualization

---

### 2. Client-side Filtering and Searching

Current filtering is performed on the client side, which may become inefficient with large datasets.

**Mitigation:**

* move filtering and searching to the backend

---

### 3. Repeated API Requests

A basic caching mechanism (`lastFetched`) is implemented to reduce repeated requests, but it may not be sufficient for more complex scenarios.

**Risk:**

* duplicate requests across components or navigation

**Mitigation:**

* request deduplication
* caching per request parameters

---

### 4. Error Handling Complexity

There is a potential risk of overlapping errors (e.g., timeout vs server response), which may lead to inconsistent UI states.

**Mitigation:**

* strict separation of:

    * network errors (timeout)
    * HTTP errors (API responses)

---

### 5. Client-side State Growth

As the application grows, storing more data in a single global store may lead to increased memory usage and reduced maintainability.

**Mitigation:**

* split store into domain modules
* limit stored data scope

---

### 6. Real-time Update Strategy

Polling is currently used for data updates, which may not scale well with increased users or data volume.

**Mitigation:**

* switch to WebSockets or SSE for real-time updates
