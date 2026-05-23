# 🚀 Premium Internship Search Portal

A feature-rich Next.js Web Application built for the **Internshala SDE Internship Assignment**. This portal integrates real-time search, robust client-side filters, and a clean, responsive UI designed to provide a seamless internship discovery experience.

📂 **GitHub Repository:** https://github.com/parv9999/internshala-search  
🌐 **Live Deployment:** https://internshala-search.vercel.app

---

## 👨‍💻 Developer

* **Name:** Parv Chauhan
* **Email:** [parvchauhan36@gmail.com](mailto:parvchauhan36@gmail.com)

---

## ✨ Features & Functionalities

1. **CORS Server-Side Proxy Endpoint (`/api/internships`)**:
   - Direct browser calls to Internshala's API trigger CORS blockers. Resolved by implementing a Next.js server-side route handler acting as a proxy layer.

2. **Client-Side Filter Engine (`useInternships.js`)**:
   - Supports multi-select profile tags, searchable city lists, duration filters, remote-only toggle, and a real-time stipend range slider.

3. **Dark Mode Theme**:
   - Full dark mode syncing with local device preferences or `localStorage`, updating smoothly across all components.

4. **Bookmark System**:
   - Save favourite internships to `localStorage` so they persist across page reloads.

5. **Sorting**:
   - Sort listings by Newest, Stipend (High → Low / Low → High), and Duration (Shortest / Longest).

6. **Grid / List View Toggle**:
   - Instantly switch between card grid layout and wide horizontal list layout.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Styling:** Vanilla CSS Modules
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)

---

## 🚀 Setup & Local Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parv9999/internshala-search.git
   cd internshala-search
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
