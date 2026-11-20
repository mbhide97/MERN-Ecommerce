# MERN Ecommerce Website

A full-stack Ecommerce Web Application built using the MERN Stack.

## 🚀 Project Overview

This project is a modern Ecommerce application with a React frontend and Node.js/Express backend. It includes user authentication, product management, shopping cart, wishlist, orders and checkout functionality.

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* React Router
* Axios
* Bootstrap / CSS
* Context API
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* CORS
* dotenv

## ✨ Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Product Listing
* Product Details
* Product Search / Filtering
* Shopping Cart
* Add to Cart
* Increase / Decrease Quantity
* Wishlist
* Checkout
* Order Management
* Order Details
* User Profile
* Responsive UI
* Backend REST APIs

## 📁 Project Structure

```text
MERN-Ecommerce/
│
├── ecommerce-dashboard/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mbhide97/MERN-Ecommerce.git
```

```bash
cd MERN-Ecommerce
```

### 2. Frontend Setup

```bash
cd ecommerce-dashboard
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

### 3. Backend Setup

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the backend:

```bash
node server.js
```

For development with nodemon:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

## 🔐 Environment Variables

Do not upload your `.env` file to GitHub.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🔄 Application Flow

```text
React Frontend
       ↓
     Axios
       ↓
Express REST API
       ↓
   Controllers
       ↓
    Mongoose
       ↓
    MongoDB
```

## 📌 Main Modules

### Authentication

* Register
* Login
* JWT Token
* Protected Routes
* Password Hashing

### Products

* Product listing
* Product details
* Product management

### Cart

* Add product
* Remove product
* Update quantity
* Cart total

### Orders

* Checkout
* Create order
* Order history
* Order details

### Wishlist

* Add product
* Remove product
* Wishlist management

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

* React component development
* React Router
* Context API
* REST API integration
* Node.js and Express
* MongoDB and Mongoose
* JWT authentication
* Protected routes
* CRUD operations
* Full-stack project structure
* Git and GitHub

## 👨‍💻 Developer

**Madhura Bhide**

GitHub: https://github.com/mbhide97

## 📄 License

This project is created for learning and portfolio purposes.
