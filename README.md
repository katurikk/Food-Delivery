# 🍔 Food Delivery App - Backend

This is the backend of a full-featured Food Delivery Application built with **Node.js**, **Express**, and **SQLite** (or any other DB). It provides RESTful APIs for user authentication, restaurants, menu items, orders, cart, address, reviews, and payments.

---

## 🔧 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** SQLite (can be replaced with MySQL/PostgreSQL/MongoDB)
* **Authentication:** JWT (JSON Web Tokens)
* **Others:** bcryptjs, dotenv, nodemon

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # DB configuration
│   ├── controllers/      # All business logic
│   ├── middleware/       # Authentication middleware
│   ├── routes/           # Express routes
│   ├── app.js            # Main app file
│   └── server.js         # Starts the server
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/food-delivery-backend.git
cd food-delivery-backend/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env` file

Create a `.env` file in the root (`/backend`) and add:

```
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the server

```bash
npm run dev
```

> The server will run on: `http://localhost:5000`

---

## 🔐 API Authentication

Protected routes require a JWT token:

* Add it to the header as:

  ```
  Authorization: Bearer <your_token>
  ```

---

## 🛏️ API Endpoints (Sample)

### Auth

* `POST /api/register` – Register a user
* `POST /api/login` – Login & get token
* `GET /api/profile` – Get user profile (protected)

### Restaurants

* `GET /api/restaurants` – List all restaurants

### Menu

* `GET /api/menu/:restaurantId` – Get menu for a restaurant

### Cart / Orders / Address / Reviews / Payments

* Full CRUD APIs available

---

## 🛡️ Features

* Secure authentication with JWT
* Password hashing using bcrypt
* RESTful routing structure
* Modular, scalable project structure
* Error handling & validation
* Environment-based configuration

---

## ✍️ Author

**Katuri Karthik**
Connect on [LinkedIn](https://linkedin.com) • [GitHub](https://github.com/your-username)

---

## 📄 License

MIT
