## 📦 Work Breakdown Structure

* UI Development (Deals list, details view)
* API Integration (fetch deals, fetch by id)
* Search implementation
* Filters (status, amount, date)
* Deduplication logic
* Pagination
* Role-based access simulation
* Error handling & retry logic
* Real-time updates (polling)
* Caching strategy
* Internationalization (i18n)
* Security implementation (input sanitization, XSS prevention)
* Responsive design
* Docker setup
* Documentation


## ⏱ Estimation Method

The estimation is based on task complexity, prior experience with similar technologies, and implementation scope.

Tasks were categorized as:

* Simple (1–2 hours)
* Medium (3–6 hours)
* Complex (6+ hours)

Additional buffer time was added for testing and edge cases.


## 📊 Estimation Table

| Task                        | Time Estimate | Confidence | Dependencies             |
| --------------------------- | ------------- | ---------- | ------------------------ |
| Init Frontend               | 2h            | Medium     | None                     |
| Init Backend                | 2h            | Medium     | None                     |
| UI Development              | 6h            | Medium     | Init Frontend            |
| API Integration             | 1h            | High       | Init Backend             |
| Search                      | 1h            | High       | UI Development           |
| Filters                     | 3h            | Medium     | Search                   |
| Deduplication               | 1h            | High       | API Integration          |
| Pagination                  | 1h            | High       | UI Development           |
| Role-based access           | 2h            | Medium     | API Integration          |
| Error handling & retry      | 2h            | Medium     | API Integration          |
| Real-time updates (polling) | 2h            | High       | API Integration          |
| Caching                     | 2h            | Medium     | State Management         |
| i18n                        | 2h            | High       | UI Development           |
| Security                    | 1h            | Medium     | Input handling           |
| Responsive design           | 1h            | Medium     | UI Development           |
| Docker setup                | 2h            | Medium     | Application ready        |
| Documentation               | 3h            | High       | All features implemented |


## 📌 Assumptions

* API contract is stable
* No authentication is required
* Design requirements are flexible
* Backend logic is simple and controlled
* No external integrations are needed
