# JWT Authentication Setup Guide

## ✅ What's Implemented

### Backend:
1. **User Model** (`server/models/User.js`)
   - Name, email, password fields
   - Password hashing with bcryptjs
   - User roles (user/admin)
   - Password comparison method

2. **Auth Routes** (`server/routes/authRoutes.js`)
   - POST `/api/auth/signup` - Register new user
   - POST `/api/auth/login` - Login user
   - GET `/api/auth/me` - Get current user

3. **Auth Middleware** (`server/middleware/authMiddleware.js`)
   - JWT token verification
   - Admin role check

4. **Admin Seeder** (`server/seedAdmin.js`)
   - Creates default admin user

### Frontend:
1. **AuthContext** (`src/context/AuthContext.jsx`)
   - JWT token management
   - API integration
   - User state management
   - Login/Signup/Logout functions

2. **Login Page** (`src/pages/Login.jsx`)
   - Real API integration
   - Error handling
   - No demo credentials

3. **Signup Page** (`src/pages/Signup.jsx`)
   - Real API integration
   - Password validation
   - Error handling

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens

### Step 2: Create Admin User
```bash
npm run seed:admin
```

This creates:
- Email: `admin@ecommerce.com`
- Password: `admin123`
- Role: `admin`

### Step 3: Start Backend
```bash
npm run dev:server
```

### Step 4: Start Frontend
```bash
npm run dev
```

---

## 🧪 Testing Authentication

### Test Signup:
1. Go to http://localhost:5173/signup
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm: password123
3. Click "Create Account"
4. Should redirect to homepage
5. Check navbar - should show "Test"

### Test Login:
1. Go to http://localhost:5173/login
2. Enter credentials:
   - Email: admin@ecommerce.com
   - Password: admin123
3. Click "Sign In"
4. Should redirect to homepage
5. Check navbar - should show "Admin"

### Test Admin Access:
1. Login as admin
2. Go to http://localhost:5173/admin
3. Should see admin dashboard
4. Try adding/editing products

### Test Protected Routes:
1. Logout
2. Try to access http://localhost:5173/admin
3. Should redirect to login page
4. Login as regular user
5. Try to access http://localhost:5173/admin
6. Should show "Access Denied"

---

## 🔐 How It Works

### Registration Flow:
1. User fills signup form
2. Frontend sends POST to `/api/auth/signup`
3. Backend hashes password with bcryptjs
4. Backend creates user in MongoDB
5. Backend generates JWT token
6. Frontend stores token in localStorage
7. User is logged in

### Login Flow:
1. User fills login form
2. Frontend sends POST to `/api/auth/login`
3. Backend finds user by email
4. Backend compares password with bcrypt
5. Backend generates JWT token
6. Frontend stores token in localStorage
7. User is logged in

### Protected Routes:
1. User tries to access admin page
2. ProtectedRoute checks if user exists
3. If not logged in → redirect to login
4. If logged in but not admin → show access denied
5. If admin → show page

### Token Verification:
1. Frontend sends token in Authorization header
2. Backend middleware verifies JWT
3. Backend attaches user to request
4. Route handler can access req.user

---

## 📝 API Endpoints

### POST /api/auth/signup
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/login
**Request:**
```json
{
  "email": "admin@ecommerce.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "Admin User",
  "email": "admin@ecommerce.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /api/auth/me
**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "...",
  "name": "Admin User",
  "email": "admin@ecommerce.com",
  "role": "admin"
}
```

---

## 🔒 Security Features

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ JWT tokens with 30-day expiration
- ✅ Token stored in localStorage
- ✅ Protected routes with middleware
- ✅ Admin role verification
- ✅ Password minimum length (6 chars)
- ✅ Email uniqueness check
- ✅ Error handling for invalid credentials

---

## 🐛 Troubleshooting

### Issue: "User already exists"
**Solution:** Email is already registered. Use different email or login.

### Issue: "Invalid email or password"
**Solution:** Check credentials. Make sure admin user is created with `npm run seed:admin`.

### Issue: "Not authorized"
**Solution:** Token expired or invalid. Logout and login again.

### Issue: "Cannot access admin panel"
**Solution:** Make sure you're logged in as admin user.

---

## ✅ Checklist

- [x] Install bcryptjs and jsonwebtoken
- [x] Create User model
- [x] Create auth routes
- [x] Create auth middleware
- [x] Update server index.js
- [x] Create admin seeder
- [x] Update AuthContext with API calls
- [x] Remove demo credentials from Login
- [x] Update Login to use async
- [x] Update Signup to use async
- [x] Add JWT_SECRET to .env
- [x] Test signup
- [x] Test login
- [x] Test protected routes
- [x] Test admin access

---

## 🎉 Complete!

JWT authentication is now fully implemented with:
- Real user registration
- Secure password hashing
- JWT token authentication
- Protected admin routes
- Role-based access control

**No more demo credentials - real authentication!** 🔐
