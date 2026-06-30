### 🛠️ Omnikira Labs — Client Lead Management System (Mini CRM)

Omnikira Labs CRM is a full-stack lead management system built with Node.js, Express, and MongoDB. It captures client inquiries from a public contact form, then lets admins securely log in to track lead status, add follow-up notes, search/filter leads, and view real-time conversion analytics — built to mirror how real-world agencies manage incoming clients.

The application is structured as three connected interfaces: a public-facing inquiry form, a secure admin login gate, and a protected dashboard — built with a dark, terminal-inspired aesthetic for a professional, modern feel.

---

### 🌐 Live Demo

| Interface | Live URL |
| --- | --- |
| **Public Contact Form** | [Open Live](https://rohith292006.github.io/FUTURE_FS_02/frontend/index.html) |
| **Admin Login** | [Open Live](https://rohith292006.github.io/FUTURE_FS_02/frontend/admin.html) |
| **Backend API** | [https://future-fs-02-ngex.onrender.com](https://future-fs-02-ngex.onrender.com) |

**Demo Admin Credentials:**
```
Email: admin@futurefs.com
Password: Admin@1234
```

> ⚠️ The backend is hosted on Render's free tier, which spins down after periods of inactivity. The **first request may take 30–50 seconds** to respond while the server wakes up — this is expected behavior, not a bug. Subsequent requests will be instant.

**Hosting Stack:**
* Frontend → GitHub Pages
* Backend → Render (Node.js Web Service)
* Database → MongoDB Atlas (Cloud)

---

### 🎯 Objectives of the Project

* To build a simple yet functional CRM that allows an admin to view, manage, and convert leads coming from a website contact form.
* To implement a secure authentication system using JWT so that only authorized admins can access lead data.
* To design a full REST API with Node.js and Express handling all lead CRUD operations.
* To integrate MongoDB as a persistent database for storing lead details, status, and follow-up notes.
* To provide real-time analytics — total leads, conversion rate, and status breakdown — directly on the dashboard.
* To demonstrate backend integration, database management, and real-world business workflow design.

---

### 🧩 Key Features

* **Public Contact Form**: A polished lead-capture form where visitors submit their name, email, phone, source, service interest, and project brief — saved directly to MongoDB via the Express API.
* **Secure Admin Login**: JWT-based authentication restricts dashboard access to authorized admins only. Sessions expire automatically after 8 hours.
* **Lead Listing**: A sortable table displaying every lead's name, email, source, status, and submission date.
* **Status Pipeline**: One-click status updates — New → Contacted → Converted — with instant UI feedback and persistence to the database.
* **Follow-up Notes**: Admins can add timestamped notes to any lead to track conversation history and next steps.
* **Search & Filter**: Live search by name or email, combined with status filters, to quickly locate specific leads.
* **Real-Time Analytics**: Dashboard cards showing total leads, new leads, contacted leads, converted leads, and live conversion rate percentage.
* **Spam Protection**: A honeypot field on the public form silently blocks bot submissions without affecting real users.
* **Fully Responsive Layout**: Every page adapts cleanly across desktop, tablet, and mobile using CSS Grid, Flexbox, and media queries.
* **Toast Notifications**: Real-time success and error feedback for every action — form submission, login, status updates, notes, and deletions.

---

### 🛠️ Technologies Used

| Technology | Description |
| --- | --- |
| **HTML5 / CSS3** | Semantic structure and a custom dark UI with a terminal-inspired design language, built using CSS variables, Flexbox, and Grid. |
| **JavaScript (ES6+)** | Handles all client-side logic — form validation, API calls via `fetch()`, dynamic DOM rendering, and local storage session management. |
| **Node.js** | JavaScript runtime powering the backend server. |
| **Express.js** | REST API framework handling all routes for authentication and lead management. |
| **MongoDB (Atlas)** | Cloud-hosted NoSQL database storing lead documents, including nested follow-up notes and timestamps. |
| **Mongoose** | ODM library used to define schemas and interact with MongoDB. |
| **JWT (jsonwebtoken)** | Issues and verifies secure tokens for protected admin routes. |
| **bcryptjs** | Available for password hashing in future multi-admin expansion. |
| **dotenv** | Manages environment variables such as database URIs and secret keys. |

---

### ⚙️ Working Methodology

1. **Lead Capture**: A visitor fills out the public contact form (`index.html`). On submission, the data is validated client-side and sent via a `POST` request to `/api/leads`, where it is saved in MongoDB with a default status of `new`.
2. **Admin Authentication**: The admin navigates to `admin.html` and logs in with their email and password. The credentials are verified against environment variables, and on success, the server issues a JWT token stored in the browser's local storage.
3. **Dashboard Access**: `dashboard.html` checks for a valid token on load. If present, it fetches all leads and analytics data from protected API routes, attaching the JWT in the `Authorization` header of every request.
4. **Lead Management**: Clicking any lead opens a detail panel where the admin can update its status, add follow-up notes, or delete it entirely — each action triggering an API call that updates MongoDB in real time.
5. **Search, Filter & Analytics**: As the admin types in the search bar or selects a status filter, the frontend re-queries the `/api/leads` endpoint with query parameters. Analytics cards pull aggregated counts from a dedicated `/api/leads/analytics` endpoint.
6. **Session Handling**: If a request returns a `401` or `403` (expired or invalid token), the admin is automatically logged out and redirected to the login page.

---

### 📁 Project Structure

```
future-fs-02/
│
├── backend/
│   ├── server.js          ← Express app entry point, connects to MongoDB
│   ├── package.json       ← Backend dependencies
│   ├── .env               ← Environment variables (not committed)
│   ├── models/
│   │   └── Lead.js        ← Mongoose schema for leads & notes
│   ├── middleware/
│   │   └── auth.js        ← JWT verification middleware
│   └── routes/
│       ├── auth.js        ← Admin login route
│       └── leads.js       ← Lead CRUD + analytics routes
│
├── frontend/
│   ├── index.html         ← Public contact form (lead capture)
│   ├── admin.html         ← Admin login page
│   └── dashboard.html     ← CRM dashboard (manage leads)
│
└── README.md              ← Project documentation
```

---

### 🚀 Local Development Setup

> The live demo above is fully functional — this section is only needed if you want to run the project locally for development or testing.

**1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/future-fs-02.git
cd future-fs-02
```

**2. Set Up the Backend**
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
PORT=5000
```

**3. Run the Backend Server**
```bash
npm run dev
```
The API will be live at `http://localhost:5000`

**4. Open the Frontend**

Open `frontend/index.html` directly in your browser, or use a tool like VS Code's Live Server extension for the best experience across all three pages.

**5. Admin Access**

Navigate to `frontend/admin.html` and log in using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` set in your `.env` file. You'll be redirected to the dashboard on success.

---

### ✅ Task Requirements Checklist

* [x] Lead listing — name, email, source, status
* [x] Lead status updates — new / contacted / converted
* [x] Notes and follow-ups for each lead
* [x] Secure admin access with JWT-based login
* [x] Backend system handling leads via Node.js + Express
* [x] Frontend dashboard to view and manage leads
* [x] Database (MongoDB) to store lead information
* [x] Search & filter leads *(bonus)*
* [x] Timestamp tracking on every lead *(bonus)*
* [x] Simple analytics — total leads, conversions *(bonus)*
* [x] Fully deployed live demo accessible to anyone, anywhere *(bonus)*

---

### 📌 Applications

* Lead management system for agencies, freelancers, and startups handling website inquiries.
* Task 2 submission for the Future Interns Full Stack Web Development track.
* Reference architecture for building secure, JWT-authenticated admin dashboards with Express and MongoDB.
* Demonstration of full CRUD operations, RESTful API design, and real-world business workflow implementation.

---

### 👨‍💻 Developer Information

* **Developer:** S. Rohith
* **Track:** Full Stack Web Development — Future Interns (Track Code: FS)
* **Task:** Task 2 — `future-fs-02`
* **Project Type:** Full-Stack CRM / Internship Task Submission
* **Target Environment:** Node.js Backend + Browser-Based Frontend
* **GitHub:** [rohith292006](https://github.com/rohith292006)
* **Email:** rohith20062908@gmail.com

---

*Built as Task 2 @ Future Interns · Full Stack Web Development Track · 2026*
