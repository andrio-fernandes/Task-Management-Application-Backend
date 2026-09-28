# Task Management Application Backend

Backend API for the Task Management Application built using Node.js, Express.js, MongoDB, and JWT Authentication.

This backend handles:

* User Authentication
* Task CRUD Operations
* JWT Authorization
* MongoDB Database Integration

---

# 🚀 Live API
https://task-management-application-backend-bnvj.onrender.com


> ⚠️ Backend may take 30–60 seconds to respond initially because Render free tier spins down inactive services.

---

# 🔗 Frontend Repository
https://github.com/andrio-fernandes/Task-Management-Application


---

# 📌 Features

## 🔐 Authentication

* User Registration (with input validation)
* User Login
* JWT Token Generation
* Protected Routes
* Profile update (name + password change with current-password verification)

## ✅ Task Management

* Create Tasks
* Read Tasks — paginated, searchable, filterable
* Update Tasks
* Delete Tasks
* Stats counts (total / completed / pending) returned with the task list

## 🛡️ Security

* Password Hashing using bcrypt
* JWT Authentication Middleware
* Protected API Endpoints
* Ownership checks — users can only read/update/delete **their own** tasks
* Field whitelisting on updates (clients can't overwrite `user` / `_id`)
* Regex-escaped search input

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* JWT (JSON Web Token)
* bcrypt.js

## Deployment

* Render

---

# 📂 Project Structure

```text
server/

├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── user.js
│   └── task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── .env
├── package.json
└── server.js
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/andrio-fernandes/Task-Management-Application-Backend.git
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create `.env` File

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```


---

## 4️⃣ Run Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

# 🔑 API Endpoints

## Authentication Routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register User          |
| POST   | `/api/auth/login`    | Login User             |
| GET    | `/api/auth/profile`  | Get Current User       |
| PUT    | `/api/auth/profile`  | Update Name / Password |

---

## Task Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get Tasks (paginated) |
| POST   | `/api/tasks`     | Create Task   |
| PUT    | `/api/tasks/:id` | Update Task   |
| DELETE | `/api/tasks/:id` | Delete Task   |

### GET `/api/tasks` query parameters

| Param    | Type   | Default | Description                                  |
| -------- | ------ | ------- | -------------------------------------------- |
| `search` | string | —       | Case-insensitive match on title/description  |
| `status` | string | —       | `Pending` or `Completed`                     |
| `page`   | number | `1`     | Page number                                  |
| `limit`  | number | `10`    | Page size (max `50`)                         |

### Response envelope

```json
{
  "tasks": [],
  "total": 0,
  "page": 1,
  "totalPages": 1,
  "stats": { "total": 0, "completed": 0, "pending": 0 }
}
```

`stats` counts are always user-wide (not affected by `search`/`page`).

---

# 🔒 Protected Routes

Task and profile routes require JWT token in headers:

```http
Authorization: Bearer your_jwt_token
```

---

# 📚 Learning Outcomes

Through this project, I learned:

* REST API development
* Express.js routing
* MongoDB integration
* JWT Authentication
* Password hashing
* CRUD operations
* Pagination, filtering and search APIs
* Authorization best practices (ownership checks, field whitelisting)
* Backend deployment using Render
* Environment variable management

---

# 👨‍💻 Author

Andrio Fernandes

GitHub: https://github.com/andrio-fernandes

