# 🏛️ GOA Website

A full-stack educational platform for GOA (Goal-Oriented Academy), built to provide students with a place to learn, share projects, interact with posts, and manage their profiles.

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT authentication
- HTTP-only authentication cookies
- Protected routes
- User logout
- Password hashing with bcrypt
- Student and admin roles

### 👤 User Profiles
- Create and edit profiles
- Upload profile avatars
- Add a bio
- Add country information
- Add GitHub and portfolio links
- View user information

### 📝 Posts
- Create posts
- Upload images
- View all posts
- View individual posts
- Like and unlike posts
- Add comments
- Delete comments
- Delete posts

### 💻 Projects
- Publish projects
- Add GitHub repository links
- Add live demo links
- Add project technologies
- Upload project images
- Edit projects
- Delete projects
- Like and unlike projects
- Add comments
- View personal projects

### 🛡️ Admin Features
- Manage users
- Delete users
- Manage website content
- Admin-only functionality

### 🎨 Frontend
- Responsive interface
- Modern UI
- React components
- Client-side routing
- Authentication state management
- API integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcrypt |
| File Uploads | Cloudinary |
| Styling | CSS |
| API | REST API |

---

## 📁 Project Structure

```text
GOA_website/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── package.json
│
└── README.md
