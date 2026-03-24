# 📄 Feature Development Report

---

## ⏱ Planned vs Actual Time

| Task                        | Planned | Actual |
| --------------------------- |---------|--------|
| Init Frontend               | 1h      | 1h     |
| Init Backend                | 1h      | 1h     |
| UI Development              | 4h      | 3h     |
| API Integration             | 1h      | 1h     |
| Search                      | 1h      | 0.5h   |
| Filters                     | 3h      | 2.5h   |
| Deduplication               | 1h      | 0.5h   |
| Pagination                  | 1h      | 0.5h   |
| Role-based access           | 1h      | 0.5h   |
| Error handling & retry      | 2h      | 1h     |
| Real-time updates (polling) | 1h      | 0.5h   |
| Caching                     | 1h      | 0.5h   |
| i18n                        | 1h      | 1h     |
| Security                    | 1h      | 1h     |
| Responsive design           | 0.5h    | 0.5h   |
| Docker setup                | 1h      | 1h     |
| Documentation               | 3h      | 2h     |

**Total:**

* Planned: ~24.5h
* Actual: ~19h

Some tasks required additional time due to debugging, edge cases, and environment configuration.

---

## ⚠️ Challenges Encountered

* Handling API errors consistently across different layers (API → Store → UI)
* Implementing request timeout using `AbortController`
* Combining caching and polling without creating conflicts
* Docker configuration and environment variable setup
* Managing complex filtering logic with multiple conditions
* Ensuring type safety while working with async data

---
