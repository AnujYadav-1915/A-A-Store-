# 🛍️ A&A Store – A Premium E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://a-a-store-frontend.vercel.app/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-informational)](#)

> ⚡ A&A Store is a high-performance e-commerce platform built with the MERN stack, featuring a seamless shopping experience and integrated Razorpay payments.

---

## 🌐 Live Site

🔗 [**A&A Store Live**](https://a-a-store-frontend.vercel.app/)

---

## ✅ Features

- 🔐 User authentication (JWT-based Login/Register)
- 🛒 Real-time cart management
- 🧾 Seamless Razorpay Checkout flow 
- 📚 Dynamic Category-wise product browsing
- 🧑 User profile, order history, and wishlist
- ⚡ Ultra-fast, responsive, and premium UI
- 📱 Mobile-optimized layout using Tailwind CSS

---

## 🧱 Tech Stack

| Tech         | Description                        |
|--------------|------------------------------------|
| **Frontend** | React, Redux Toolkit, Tailwind CSS |
| **Backend**  | Node.js, Express.js                |
| **Database** | MongoDB Atlas                      |
| **Auth**     | JWT / Cookie-based Auth            |
| **Deploy**   | Vercel (Full Stack)                |
| **Tools**    | Razorpay, Cloudinary               |

---

## 🛠️ Clone & Setup

Follow these steps to run **NakliZon** locally:

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ashish11211121/e-commerce-nakli-platform.git
cd NakliZon
```

---

## 2️⃣ Start the Backend
```bash
cd Server
npm install
# Create a .env file and add:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-jwt-secret>
# RAZORPAY_KEY_ID=<your-razorpay-key>
# RAZORPAY_KEY_SECRET=<your-razorpay-secret>
# CLIENT_URL=http://localhost:5173
npm run dev
```

## 3️⃣ Start the Frontend
```bash
cd Client
npm install
# Create a .env file and add:
# VITE_CLOUD_NAME_CLOUDINARY=<your-cloudinary-name>
# VITE_Server_URL=http://localhost:5000
# VITE_RAZORPAY_KEY_ID=<your-razorpay-key>
npm run dev
```
🖥️ Visit your app at: http://localhost:5173

---

## 👤 Authors
- **Anuj Yadav**: [GitHub](https://github.com/AnujYadav-1915)
- **Ashish**: [GitHub](https://github.com/ashish11211121)

⚙️ NakliZon is a professional e-commerce practice project built to showcase full-stack mastery.
