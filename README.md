# Sudoku Web App

A modern, responsive Sudoku web application built with **SvelteKit** and **TypeScript**.
The app focuses on reproducible Sudoku puzzles, clean design, and simple usability across devices.

---

## ✨ Features

* **Reproducible Sudokus**

  * Every Sudoku is generated from a unique numeric seed.
  * The seed is embedded directly in the URL, making puzzles easy to share and revisit.

* **Multiple Difficulty Levels**

  * Difficulties are defined by the number of prefilled cells.
  * Easily switch between difficulty levels when generating a new puzzle.

* **Solutions Included**

  * Every generated Sudoku has a valid, computable solution.
  * Solutions can be revealed on demand.

* **Print to PDF**

  * Export any Sudoku to a clean, printable PDF.
  * Ideal for offline solving or sharing physical copies.

* **Responsive, Modern UI**

  * Fully responsive layout for desktop, tablet, and mobile.
  * Styled with Tailwind CSS.

* **Simple Settings**

  * Quickly generate a new Sudoku.
  * Adjust difficulty without leaving the page.

---

## 🔗 URL-Based Sudoku Generation

Each Sudoku is generated using a numeric seed:

```
/sudoku/{id}-{init_fields}
```

Using the same seed and initial fields will always generate the same Sudoku.
This makes puzzles reproducible, bookmarkable, and shareable.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (recommended: latest LTS)
* **pnpm**

If you don’t have pnpm installed yet:

```bash
npm install -g pnpm
```

---

### Installation

```bash
git clone https://github.com/your-username/sudoku-web.git
cd sudoku-web
pnpm install
```

---

### Development Server

Start the development server and automatically open the app in your browser:

```bash
pnpm run dev --open
```

The app will be available at:

```
http://localhost:5173
```

---

## 🧪 Testing

Run all tests:

```bash
pnpm run test
```

Run tests in watch mode:

```bash
pnpm run test:watch
```

---

## 🧹 Linting & Formatting

Check linting:

```bash
pnpm run lint
```

Format the codebase:

```bash
pnpm run format
```

---

## 📦 Build for Production

```bash
pnpm run build
pnpm run preview
```

---

## 🐳 Docker

Run with Docker:

```bash
docker compose -f docker/docker-compose.yml up -d
```

The app will be available at `http://localhost:3000`.

See [docker/DOCKER.md](docker/DOCKER.md) for configuration options.

---

## 🧩 Project Goals

* Deterministic Sudoku generation via URL-based seeds
* Clear separation between puzzle logic and UI
* Strong test coverage for core logic
* Clean, modern UI with minimal distractions

---

## 📄 License

MIT License
Feel free to use, modify, and distribute this project.

---

## 🤝 Contributing

Contributions, ideas, and bug reports are welcome.
Feel free to open an issue or submit a pull request.
