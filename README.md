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

* User Registration
* User Login
* JWT Token Generation
* Protected Routes

## ✅ Task Management

* Create Tasks
* Read Tasks
* Update Tasks
* Delete Tasks

## 🛡️ Security

* Password Hashing using bcrypt
* JWT Authentication Middleware
* Protected API Endpoints

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
PORT=5000
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

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

## Task Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get All Tasks |
| POST   | `/api/tasks`     | Create Task   |
| PUT    | `/api/tasks/:id` | Update Task   |
| DELETE | `/api/tasks/:id` | Delete Task   |

---

# 🔒 Protected Routes

Task routes require JWT token in headers:

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
* Backend deployment using Render
* Environment variable management

---

# 👨‍💻 Author

Andrio Fernandes

GitHub: https://github.com/andrio-fernandes

