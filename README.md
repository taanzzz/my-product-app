# Premium Store - A Full-Stack Next.js Application

This is a **full-stack e-commerce application** built with a **Next.js 15 (App Router)** frontend and a separate **Express.js backend**.  
It features a modern, responsive UI, complete user authentication (custom credentials & Google Sign-In), and full CRUD functionality for product management.

---

## 🌐 Live Links

- **Frontend Live Demo:** https://my-product-app-y7ne.vercel.app  
- **Backend API:** https://productsprm.onrender.com/  

---

## 📂 GitHub Repositories

- **Frontend Repo:** https://github.com/taanzzz/my-product-app
- **Backend Repo:** https://github.com/taanzzz/my-product-app-backend
---

## 🚀 Key Features

- **Full-Stack Architecture:** Decoupled Next.js frontend & Express.js backend.  
- **Complete Authentication:** User registration, login, logout, and email verification.  
- **Dual Login System:** Traditional credentials (JWT) + Google login (NextAuth).  
- **Product CRUD:** Create, Read, Update, and Delete functionality for products.  
- **Ownership & Authorization:** Users can only manage their own products.  
- **Protected Routes:** Secure both frontend pages & backend APIs.  
- **Modern Responsive UI:** Premium design with glassmorphism & gradient effects.  
- **Theme Toggle:** Light/Dark mode support.  
- **Enhanced UX:** Toast notifications & loading states for smooth experience.  

---

## 🛠️ Technologies Used

**Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS, NextAuth.js, lucide-react, react-hot-toast  
**Backend:** Node.js, Express.js, MongoDB (Native Driver), JWT, bcryptjs, cors, cookie-parser, multer  
**Services:** MongoDB Atlas, Cloudinary, Nodemailer (Gmail), Vercel (Frontend Deployment), Render (Backend Deployment)  

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Node.js (v18+)  
- npm  
- Git  

---

### 🔧 Backend Setup

```bash
# Clone backend repo
git clone https://github.com/taanzzz/my-product-app-backend
cd your-backend-repo 

# Install dependencies
npm install

Create a .env file in the root of the backend:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Nodemailer (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_digit_gmail_app_password

# Run the server:
npm run dev
Backend runs on 👉 http://localhost:5000


🎨 Frontend Setup
# Clone frontend repo
git clone https://github.com/taanzzz/my-product-app
cd your-frontend-repo

# Install dependencies
npm install

Create a .env.local file in the root of the frontend:
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

Run the server:
npm run dev
Frontend runs on 👉 http://localhost:3000

## 📑 Route Summary

### 🔹 Frontend Routes
| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/` | GET | Landing Page | Public |
| `/products` | GET | All Products Page | Public |
| `/products/[id]` | GET | Single Product Details | Public |
| `/login` | GET | Login Page | Public |
| `/register` | GET | Registration Page | Public |
| `/dashboard` | GET | Dashboard Overview | Protected |
| `/dashboard/my-products` | GET | User's Products | Protected |
| `/dashboard/add-product` | GET | Add Product | Protected |
| `/dashboard/update-product/[id]` | GET | Update Product | Protected |

---

### 🔹 Backend API Routes
| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/users/register` | POST | Register user | Public |
| `/api/users/login` | POST | Login user | Public |
| `/api/users/google-login` | POST | Google Sign-In | Public |
| `/api/users/logout` | POST | Logout user | Public |
| `/api/users/verify-email` | POST | Verify email | Public |
| `/api/products` | GET | Get all products (with search) | Public |
| `/api/products/:id` | GET | Get single product | Public |
| `/api/products` | POST | Add product | Protected |
| `/api/products/my-products` | GET | Get logged-in user’s products | Protected |
| `/api/products/:id` | PUT | Update product | Protected |
| `/api/products/:id` | DELETE | Delete product | Protected |


