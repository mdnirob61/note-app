<div align="center">

# 📝 Note App

### Your thoughts. Your space. Your notes.

A modern, full-stack personal note-taking application built to help you
capture ideas, organize information, and manage your notes through a
clean and intuitive interface.

<br />

<p>
  <img src="https://img.shields.io/badge/Next.js-16.4.0-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p>
  <img src="https://img.shields.io/badge/Framework-Next.js-black?style=flat-square&logo=next.js" alt="Framework" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript" alt="Language" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss" alt="Styling" />
  <img src="https://img.shields.io/badge/Components-shadcn%2Fui-000000?style=flat-square" alt="UI Components" />
</p>

<br />

</div>

---

## 📌 Overview

**Note App** is a personal note management application designed to make
creating, reading, updating, and organizing notes simple and convenient.

The application uses a **Next.js frontend** connected to a separate
**Express.js backend**, with MongoDB used to store note data.

The goal is to provide a clean user experience while practicing modern
full-stack web development, REST API integration, and database operations.

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>📝 Note Management</h3>
      Create and manage personal notes from a dedicated interface.
    </td>
    <td width="50%">
      <h3>✏️ Edit Notes</h3>
      Update existing note information whenever your ideas change.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📖 Note Details</h3>
      View individual notes and their saved information.
    </td>
    <td width="50%">
      <h3>🗑️ Delete Notes</h3>
      Remove notes that are no longer needed.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🏷️ Categories</h3>
      Organize notes with category information.
    </td>
    <td width="50%">
      <h3>🖼️ Image Support</h3>
      Store an image URL with a note.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📱 Responsive Interface</h3>
      Build a usable note-taking experience across different screen sizes.
    </td>
    <td width="50%">
      <h3>🔌 REST API Integration</h3>
      Communicate with the backend to retrieve and manage note data.
    </td>
  </tr>
</table>

---

## 🛠️ Technology Stack

| Technology | Purpose |
|:---|:---|
| **Next.js** | Frontend framework and application routing |
| **React** | Building reusable user interface components |
| **TypeScript** | Type-safe JavaScript development |
| **Tailwind CSS** | Utility-first styling and responsive layouts |
| **shadcn/ui** | Reusable interface components |
| **Lucide React** | Icons for the user interface |
| **Node.js** | Backend JavaScript runtime |
| **Express.js** | REST API and server-side request handling |
| **MongoDB** | Database for storing notes |

---

## 🏗️ Architecture

The application follows a frontend-backend architecture.

```text
┌─────────────────────────────┐
│        Next.js Frontend     │
│                             │
│  React + TypeScript         │
│  Tailwind CSS + shadcn/ui   │
└──────────────┬──────────────┘
               │
               │ HTTP Requests
               │ REST API
               ▼
┌─────────────────────────────┐
│       Express.js Backend    │
│                             │
│  Create / Read / Update /   │
│  Delete Notes               │
└──────────────┬──────────────┘
               │
               │ Database Queries
               ▼
┌─────────────────────────────┐
│           MongoDB           │
│                             │
│         Notes Data          │
└─────────────────────────────┘
```

The frontend communicates with the backend through HTTP requests.
The backend processes these requests and interacts with MongoDB.

> **Note:** The Express.js backend is maintained separately and is not
> included in this frontend repository.

---

## 📂 Project Structure

```text
note-app/
│
├── app/                  # Next.js App Router pages and layouts
│
├── components/           # Reusable React and UI components
│
├── hooks/                # Custom React hooks
│
├── lib/                  # Shared utilities and configuration
│
├── public/               # Static assets
│
├── .gitignore            # Git exclusion rules
├── .prettierignore       # Prettier exclusion rules
├── .prettierrc           # Prettier configuration
├── AGENTS.md             # Project instructions
├── CLAUDE.md             # Project guidance
├── components.json       # shadcn/ui configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lockfile
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

Follow these instructions to run the frontend locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm, which comes with Node.js
- [Git](https://git-scm.com/)
- A running Express.js backend
- A configured MongoDB database for the backend

### 1. Clone the repository

```bash
git clone https://github.com/mdnirob61/note-app.git
```

Navigate to the project directory:

```bash
cd note-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file named `.env.local` in the project root.

Add the following variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This variable specifies the URL of the Express.js backend.

Make sure the backend is running at the configured address.

**Security note:** Never commit `.env.local` or put private credentials in
variables prefixed with `NEXT_PUBLIC_`.

### 4. Start the development server

```bash
npm run dev
```

Open your browser and visit:

**http://localhost:3000**

The frontend should now be running locally.

---

## ⚙️ Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server after building |
| `npm run lint` | Check the project with ESLint |
| `npm run typecheck` | Check TypeScript types without emitting files |
| `npm run format` | Format TypeScript and TSX files with Prettier |

---

## 🔗 API Endpoints

The frontend communicates with an Express.js backend running separately.

The following endpoints are expected by the frontend:

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/notes` | Retrieve all notes |
| `GET` | `/notes/:id` | Retrieve a specific note |
| `POST` | `/notes` | Create a note |
| `PATCH` | `/notes/:id` | Update a note |
| `DELETE` | `/notes/:id` | Delete a note |

### Example note structure

```json
{
  "title": "Learn TypeScript",
  "content": "Practice interfaces, types, functions, and generics.",
  "category": "Programming",
  "image": "https://example.com/image.jpg",
  "createdAt": "2026-10-19T10:00:00.000Z"
}
```

The backend is responsible for validating incoming data and storing notes
in MongoDB.

---

## 🔐 Environment Variables

The frontend uses environment variables to keep configuration separate
from application code.

| Variable | Description | Example |
|:---|:---|:---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Express.js API | `http://localhost:5000` |

Create a local `.env.local` file for development.

You can also create a `.env.example` file containing placeholder values
to help other developers configure the application.

Never commit passwords, database credentials, or private API keys.

---

## 🧪 Code Quality

The project includes tools to support maintainable development:

- **TypeScript** for static type checking.
- **ESLint** for code quality checks.
- **Prettier** for consistent formatting.
- **Tailwind CSS** for maintainable styling.
- **Reusable components** for a consistent user interface.

Run the following commands before committing changes:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- User authentication and private notes.
- Note search and filtering.
- Rich-text editing.
- Image file uploads and storage.
- Improved accessibility.
- Deployment of the frontend and backend.

---

## 👨‍💻 Author

**mdnirob61**

GitHub: [@mdnirob61](https://github.com/mdnirob61)

---

<div align="center">

### Built with curiosity and a passion for learning.

⭐ If you find this project useful, consider giving the repository a star.

</div>
