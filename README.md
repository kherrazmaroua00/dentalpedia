# 🦷 Dentalpedia

Dentalpedia is a full-stack educational web application built to centralize and organize academic resources for dental students following a five-year dental curriculum. A single authenticated admin (a student) manages and uploads all learning materials, while other students access them freely — no account required.

## 📖 Overview

The platform structures content hierarchically for clear, intuitive navigation:

```
Study Year (1–6) + "residanat" → Module → Resources
```

Resources include Courses, TDs, TPs, Exams, Resume/summary sheets, and Video lectures — either uploaded directly or linked externally, keeping storage lightweight and scalable.

## ✨ Features

### Student side (public, no login)
- Browse by study year → module → resource
- View/download PDFs (courses, TDs, TPs, exams, summaries)
- Watch embedded video lectures
- Clean, pastel-themed, mobile-responsive UI
- Search across modules/resources
- Max 3 clicks from homepage to any resource

### Admin side (protected, single admin account)
- Secure login, separate from public routes
- Create/manage study years and modules
- Upload or link resources (Drive/YouTube)
- Streamlined content management dashboard

## 🗂️ Storage Strategy

No files are hosted on our own server — everything is referenced externally:

| Content type | Host | Access method |
|---|---|---|
| PDFs (courses, TDs, TPs, exams, summaries) | Google Drive | `Anyone with link → Viewer`; embedded via `/preview` iframe, downloadable via `/uc?export=download` |
| Video lectures | YouTube (Unlisted) | Standard YouTube embed |

The database stores the **external ID** (Drive file ID / YouTube video ID) rather than full URLs, for consistency and easier migration.

## 🏗️ Architecture

### Route separation
- No "Admin Login" button anywhere on the public UI.
- Admin routes (`/admin`, `/admin/dashboard`, etc.) are structurally isolated from public routes and not linked in navigation.
- API endpoints are split: `/api/admin/*` (protected) vs `/api/*` (public).
- Auth is enforced **server-side** — both a frontend route guard and a backend API check, since the frontend alone can never be trusted.

### Admin upload flow
Since files aren't hosted locally, "uploading" a resource is really a **link-ingestion** flow:
1. Admin pastes a Drive or YouTube link.
2. Backend extracts and validates the file/video ID.
3. Resource metadata (title, type, module, external ID) is saved.

## 🗃️ Data Model (draft)

```
Year
  id, name, order

Module
  id, year_id, name, description, order

Resource
  id, module_id, title, type        // 'course' | 'td' | 'tp' | 'exam' | 'resume' | 'video'
  source                            // 'drive' | 'youtube'
  external_id                       // Drive file ID or YouTube video ID
  thumbnail_url (optional)
  created_at
```

## 🎨 Design Direction

- Pastel color palette (mint green, light blue, lavender, cream)
- Rounded corners, generous white space
- Friendly sans-serif typography (Inter / Poppins / Nunito)
- Icon/color-coded resource types for fast visual scanning
- Fully mobile-responsive

## 🛠️ Tech Stack

> Not finalized yet — to be decided.

- **Frontend:** TBD
- **Backend:** TBD
- **Database:** TBD
- **Auth:** Single admin account (implementation TBD)

## 📌 Open Questions / Next Steps

- [ ] Finalize tech stack
- [ ] Design admin dashboard UI/UX
- [ ] Finalize database schema
- [ ] Build Drive/YouTube ID extraction & validation logic
- [ ] Implement admin auth
- [ ] Build resource viewer (embedded PDF/video screen)

## 📄 License

TBD

---

*Built for dental students, by a dental student.*
