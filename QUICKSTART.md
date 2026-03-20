# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Setup Environment (1 min)
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://mhuzaifatariq7_db_user:C8lkJPTcLz3bELiV@ecommerce-cluster.vlbxn1m.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### Step 3: Seed Database (1 min)
```bash
npm run seed
```

### Step 4: Start Backend (1 min)
```bash
npm run dev:server
```

### Step 5: Start Frontend (1 min)
Open new terminal:
```bash
npm run dev
```

## ✅ Done! Access Your App

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000/api

---

## 🔐 Login Credentials

### Admin Access
```
Email: admin@ecommerce.com
Password: admin123
```

### User Access
```
Email: user@example.com
Password: password123
```

---

## 🎯 Quick Test

1. **Browse Products** → Go to homepage
2. **Search** → Use search bar in navbar
3. **Add to Cart** → Click any product → Add to cart
4. **View Cart** → Click cart icon (top right)
5. **Login** → Click Profile → Login
6. **Admin Panel** → Login as admin → Go to `/admin`

---

## 📱 Test Responsive

1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select different devices
4. Test all pages

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB is connected
# Verify .env file exists
# Check port 5000 is free
```

### Frontend won't start?
```bash
# Clear cache
rm -rf node_modules
npm install
npm run dev
```

### Products not showing?
```bash
# Re-seed database
npm run seed
```

---

## 📚 Documentation

- **Full Setup:** See `README.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Week 3 Summary:** See `WEEK3_SUMMARY.md`
- **Testing:** See `RESPONSIVE_TESTING.md`

---

## 🎉 You're Ready!

Your e-commerce app is now running locally. Start building! 🚀
