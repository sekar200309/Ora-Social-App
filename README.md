# 📸 Ora – Social Media App (MERN Stack)

**Live Demo**: [https://ora09.vercel.app](https://ora09.vercel.app)

Ora is a full-stack Instagram-like social media application built using the MERN stack. Users can register, log in, upload posts with images, like, comment, save posts, and manage their profiles — all with a clean, responsive UI.

---

## 📌 Project Structure

```
Ora-Social-App/
├── Client/   👉 React + Tailwind CSS (Frontend)
├── Server/   👉 Node.js + Express + MongoDB (Backend)
```

---

## ✨ Features

- ✅ JWT Authentication (Register/Login/Logout)
- 📷 Upload images to Cloudinary
- 💬 Comment system (stored in MongoDB)
- ❤️ Like / 💾 Save posts
- 🧑 Profile management
- 📱 Fully responsive (Mobile & Desktop)
- 🌐 Hosted on Vercel (Frontend) and Render (Backend)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, JWT, Multer, Cloudinary SDK
- **Database**: MongoDB Atlas with Mongoose
- **Hosting**: Vercel (Frontend) + Render (Backend)

---

## 🖼️ UI Screenshots

### Desktop View:

![Image](https://github.com/user-attachments/assets/0d08632e-aeb3-4c8d-a3bb-d7a968f18ee3)
![Image](https://github.com/user-attachments/assets/0ddafc72-12d4-4f1a-a96c-7e25b47dbc17)
![Image](https://github.com/user-attachments/assets/79c22edf-90d7-4e6e-99ab-8c9dc43a4d9e)
![Image](https://github.com/user-attachments/assets/85eb58d7-2f69-4dab-8458-3b3cf28584e5)
![Image](https://github.com/user-attachments/assets/dee1d1e6-d464-4f3d-944e-862e221e7e9a)
![Image](https://github.com/user-attachments/assets/ccc819f1-ea5b-45fd-8cab-491520e7f6ca)
![Image](https://github.com/user-attachments/assets/b5b92e01-bee5-493e-9ba4-cb1834883596)

### Mobile View:

![Image](https://github.com/user-attachments/assets/f23f0316-1d43-47d9-8119-ce9cb27a0ed4)
![Image](https://github.com/user-attachments/assets/deb0027e-2f0d-4fdf-a8d8-c43e72ae0944)

---

## 🔐 Authentication

- JWT tokens stored in localStorage.
- Protected routes with `PrivateRoute` on frontend.
- Backend middleware for verifying tokens.

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repo

```bash
git clone https://github.com/sekar200309/Ora-Social-App.git
cd Ora-Social-App
```

### 2. Frontend Setup

```bash
cd Client
npm install
npm start
```

### 3. Backend Setup

```bash
cd Server
npm install
```

* Create a `.env` file inside `/Server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Then start the server:

```bash
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | /api/auth/register          | Register user            |
| POST   | /api/auth/login             | Login user               |
| POST   | /api/posts                  | Create post              |
| GET    | /api/posts                  | Get all posts            |
| PUT    | /api/posts/:id/like         | Like/unlike a post       |
| POST   | /api/posts/:id/comment      | Comment on a post        |
| PUT    | /api/users/save/:postId     | Save/unsave a post       |
| GET    | /api/users/saved            | Get saved posts          |
| GET    | /api/users/profile/:userId  | Get user’s profile posts |
| DELETE | /api/posts/:id              | Delete a post            |
| PUT    | /api/posts/:id              | Edit a post              |

---

## 🧪 Testing

* **Backend** tested via Postman
* **Frontend** tested manually on Chrome + Mobile View
* **All routes tested** with real MongoDB documents

---

## 🐞 Known Issues

* No real-time features (e.g., notifications)
* Feed lacks pagination
* No image compression

---

## 🔮 Future Enhancements

* Add dark mode toggle
* Add following/follower feature
* Real-time comments or chat with Socket.io
* Notifications system
* Post pagination
* Profile editing

---

## 🙌 Author

**Sekar D** – MERN Stack Intern at SmartBridge  
📫 [sekardurai142003@gmail.com](mailto:sekardurai142003@gmail.com)

---
