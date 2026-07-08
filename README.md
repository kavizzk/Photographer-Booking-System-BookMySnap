# 📸 Photographer Booking System (BookMySnap)

A **Full Stack MERN Web Application** that connects users with professional photographers for weddings, events, birthdays, and special occasions through an easy-to-use online booking platform.

---

## 🌍 Project Overview

Finding the right photographer for important events can be time-consuming and difficult. **BookMySnap** simplifies this process by providing a centralized platform where users can:

- Browse professional photographers
- View portfolios and pricing
- Check availability
- Book photographers online
- Manage bookings through personalized dashboards

The platform also provides photographers with tools to manage their profiles, availability, and bookings, while administrators can monitor and manage the overall system.

---

## ✨ Features

### 👤 User Features

- User Registration & Login
- Secure JWT Authentication
- Browse Photographer Profiles
- Search & Filter Photographers
- View Portfolio & Pricing
- Book Photographers
- Booking History
- User Dashboard

### 📷 Photographer Features

- Photographer Registration
- Manage Profile
- Upload Portfolio
- Set Pricing
- Manage Availability
- Accept/Reject Bookings
- Photographer Dashboard

### 👨‍💼 Admin Features

- Manage Users
- Manage Photographers
- View All Bookings
- Monitor Transactions
- Platform Management

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS / Material UI

## Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js

## Database

- MongoDB
- Mongoose ODM

---

# 📂 Project Structure

```
BookMySnap
│
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── Screenshots/
├── README.md
└── package.json
```

---

# 🚀 How It Works

1. User registers and logs into the application.
2. Browse photographer listings.
3. Search photographers by category, event type, or budget.
4. View photographer portfolio and pricing.
5. Select available date and time.
6. Book photographer.
7. Make secure payment.
8. Photographer receives booking request.
9. Photographer accepts or rejects the booking.
10. User can track booking status through the dashboard.

---

# 🔐 Authentication

- JWT (JSON Web Token)
- Password Encryption using Bcrypt
- Protected Routes
- Role-Based Access Control

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User/Photographer |
| POST | `/auth/login` | Login |
| GET | `/photographers` | Get all photographers |
| GET | `/photographers/:id` | Get photographer details |
| POST | `/booking/create` | Create booking |
| GET | `/user/bookings` | User booking history |
| GET | `/photographer/bookings` | Photographer booking history |
| POST | `/payment/checkout` | Payment processing |

---

# 📸 Application Screens

- 🏠 Home Page
- 🔐 Login
- 📝 Register
- 📷 Photographer Listing
- 🔍 Search & Filter
- 📅 Booking Page
- 💳 Payment Page
- 👤 User Dashboard
- 📷 Photographer Dashboard
- 👨‍💼 Admin Dashboard

> Screenshots are available in the **Screenshots/** folder.

---

# 💻 Installation

## Clone the Repository

```bash
git clone https://github.com/kavizzk/Photographer-Booking-System-BookMySnap.git
```

## Navigate to Project

```bash
cd Photographer-Booking-System-BookMySnap
```

---

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## Configure Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

STRIPE_SECRET_KEY=your_stripe_key
```

---

## Run Backend

```bash
npm start
```

or

```bash
npm run dev
```

---

## Run Frontend

```bash
cd client
npm start
```

---

# 🎯 Future Enhancements

- 🤖 AI-Based Photographer Recommendations
- 📱 React Native Mobile Application
- 💬 Live Chat Between Users & Photographers
- 🔔 Real-Time Notifications
- ⭐ Reviews & Ratings
- 📍 Google Maps Integration
- 📊 Analytics Dashboard
- 🎥 Video Portfolio Support
- 📅 Calendar Synchronization
- 🌐 Multi-language Support

---

# 📚 References

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- Tailwind CSS
- Material UI
- JWT Authentication
- Bcrypt.js
- Stripe
- PayPal
- Email.js

---

# 👩‍💻 Developed By

**Kavitha S**

🎓 B.Tech – Artificial Intelligence and Data Science

🏫 Nandha Engineering College (Autonomous)

🔗 GitHub: https://github.com/kavizzk

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is developed for educational and learning purposes.

---

> **📸 "Capture memories, book with ease." – BookMySnap**
