# 🛍️ A&A Store – A Minimal E-Commerce Practice Project

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://a-a-store-frontend.vercel.app/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-informational)](#)

> ⚡ A&A Store is a personal e-commerce practice project developed to learn and implement the full development cycle using the MERN stack and modern tools.

---

## 🌐 Live Site

🔗 [**A&A Store Live**](https://a-a-store-frontend.vercel.app/)

---

## 🖼️ Project Preview

<img width="100%" alt="A&A Store Preview" src="https://github.com/user-attachments/assets/c0c2250f-aa59-4bd0-beb8-3527d9a74be0" />

---

## ✅ Features

- 🔐 User authentication (Login/Register)
- 🛒 Add to cart and manage cart items
- 🧾 Checkout flow 
- 📚 Category-wise product browsing
- 🧑 User profile, orders, and wishlist =
- ⚡ Fast, responsive, and clean UI
- 📱 Mobile-friendly layout using Tailwind CSS

---

## 🧱 Tech Stack

| Tech         | Description                        |
|--------------|------------------------------------|
| **Frontend** | React, Tailwind CSS, React Router Dom |
| **Backend**  | Node.js, Express.js                |
| **Database** | MongoDB                            |
| **Auth**     | JWT / Sessions                     |
| **Deploy**   | Vercel (frontend) & (backend)|
| **Tools**    | Stripe, Cloudinary  |

---

## 🛠️ Clone & Setup

Follow these steps to run **A&A Store** locally:

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AnujYadav-1915/A-A-Store-.git
# or https://github.com/ashish11211121/e-commerce-nakli-platform
cd A-A-Store-
```

---


## 2️⃣ Start the Backend
```bash
cd Server
npm install
# Create a .env file and add:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-jwt-secret>
# STRIPE_SECRET_KEY=<your-stripe-secret>
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
npm run dev
```
🖥️ Visit your app at: http://localhost:5173

## 📁 Project Structure

```bash
a-a-store/
├── Client/
│   ├── src/
│   └── public/
├── Server/
│   ├── controller/
│   ├── routes/
│   └── index.js
└── readme.md
```


## 🙌 Contributing
This is a personal learning project.
Feel free to fork, explore, and improve it! 🤝

👤 Authors
- **Anuj Yadav**: [GitHub](https://github.com/AnujYadav-1915)
- **Ashish**: [GitHub](https://github.com/ashish11211121)

⚙️ A&A Store is a minimal e-commerce practice project built to enhance MERN stack development skills.
