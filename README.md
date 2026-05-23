# 🚀 Premium Internship Search Portal

A highly animated, feature-rich, and optimized Next.js Web Application designed for the **Internshala SDE Internship Assignment**. This portal integrates real-time search, robust client-side filters, and several advanced product-focused innovations designed to demonstrate exceptional engineering, modern UX design, and problem-solving capabilities.

📂 **GitHub Repository:** `https://github.com/YOUR_USERNAME/internshala-search-portal`  
🌐 **Live Deployment:** `https://internshala-search-portal.vercel.app`

---

## 👨‍💻 Developer Profile
* **Name:** Parv Chauhan
* **Email:** [parvchauhan36@gmail.com](mailto:parvchauhan36@gmail.com)
* **OS Compatibility:** Windows / macOS / Linux / iOS / Android (Fully Responsive)

---

## ✨ Core Features & Functionalities

1. **CORS Server-Side Proxy Endpoint (`/api/internships`)**: 
   - Direct browser calls to Internshala's API trigger CORS blockers. Resolved by implementing a Next.js server-side route handler acting as an optimized proxy caching layer.
2. **Client-Side Filter Matrix (`useInternships.js`)**:
   - Built an extremely optimized data flattening and client-side filter engine supporting multi-select profile tags, searchable city lists, duration adjustments, remote-only switches, and a real-time stipend range slider.
3. **Harmonious Slate-Dark Mode Theme**:
   - Full dark mode system syncing with local device preferences or `localStorage`, updating variables smoothly across all grids, sidebars, metrics, skeletons, and details drawers.
4. **Persistent Bookmark Drawer**:
   - A bookmarking system allowing users to save their favorite internships directly to local storage to persist lists across reloads.
5. **Advanced Fluid Sorting**:
   - Instantly sort listings on the client by Newest Listings, Stipend (High ➔ Low / Low ➔ High), and Duration (Shortest / Longest).
6. **Responsive Layouts (Grid vs. List View)**:
   - Dynamic buttons to instantly toggle layouts. Reorganizes grid cards on the fly into wide, horizontal rows on desktop.

---

## 🌟 Advanced Recruiter "Wow Factors"

To stand out from typical submissions, this portal incorporates three highly innovative, product-focused career accelerators built from scratch using pure CSS and optimized hooks:

### 📈 1. Live Hiring Analytics Dashboard
- Integrated a real-time visual dashboard card above search results utilizing **pure CSS & inline SVG** to analyze the active dataset:
  - **Location Breakdown**: An animated SVG circular doughnut chart displaying Remote (WFH) vs. On-site ratio percentages.
  - **Demand by Profile**: A horizontal bar chart mapping active listing frequencies. (Tapping on any bar instantly filters listings below!).
  - **Stipend Gauge**: A color-coded metric indicator plotting averages against market benchmarks (Entry, Mid, and High-tier packages).

### ⚡ 2. Skills Match Checker (Simulated AI Matcher)
- Allows candidates to simulate uploading their resume by selecting predefined tech/design/marketing profiles or typing custom skills.
- Implemented an algorithmic parsing engine calculating compatibility ratings (`45%` to `98%`) against internships, displaying pulsating tags (e.g., `⚡ 88% Match`) on listing cards.
- Automatically fills out eligibility checklists and presents custom compatibility reviews inside the details drawers.

### 📚 3. 3D Interview Prep Flashcards
- Integrated an educational interview preparation card block inside the slide-in drawer.
- Loads 3 high-probability typical interview questions customized to the specific internship role (Next.js architectures, Figma guidelines, marketing conversion rates, or SDE behaviors).
- Developed a fluid **3D flip perspective transition** using pure CSS `transform: rotateY(180deg)` and `backface-visibility: hidden` vectors to reveal standard answer sheets when cards are tapped.

### 🎫 4. Custom Social Share Ticket Modal
- Intercepts card share triggers to compile a beautiful, visually stunning referral ticket card.
- Incorporates company branding, stipends, durations, unique reference codes, copyable short URLs, and a **simulated pixel-grid verification QR Code**.
- Complete with single-click clipboard copying and printer-friendly PDF configurations.

---

## 🛠️ Tech Stack & Optimization

- **Framework:** Next.js (App Router, Turbopack Bundler)
- **Styling:** Vanilla CSS Modules (No Tailwind, absolute control over layout variables, smooth keyframes, and transitions)
- **State Management:** Native React Hooks (`useState`, `useEffect`, `useMemo` for high-efficiency client arrays cache)
- **Hydration Protections:** Engineered mount-state safety loops and `suppressHydrationWarning` parameters to ensure zero browser form-fill hydration warnings (`fdprocessedid`).

---

## 🚀 Setup & Local Execution

Follow these simple steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/internshala-search-portal.git
   cd internshala-search-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

4. **Verify production bundle compilation:**
   ```bash
   npm run build
   ```

---

## 📝 Submission Checklist
- [x] Responsive React/NextJS App Router Interface
- [x] Hosted online via Vercel (Fast zero-downtime deployment)
- [x] Client-Side caching server proxy to resolve CORS blockers
- [x] Profile, Location, Duration, and Stipend filters fully functional
- [x] Structured GitHub repository with clean commits
- [x] Contact parameters (Parv Chauhan, parvchauhan36@gmail.com) clearly defined in header/footer files
