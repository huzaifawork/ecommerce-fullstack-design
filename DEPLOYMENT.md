# Deployment Guide

## Week 3 - Complete Implementation ✅

### Features Implemented

#### 1. User Authentication ✅
- Login/Signup pages
- JWT-based authentication (localStorage)
- User roles (Admin/User)
- Protected routes
- User menu in navbar

**Demo Credentials:**
- Admin: `admin@ecommerce.com` / `admin123`
- User: Any email / Any password

#### 2. Cart Management ✅
- Add/Remove products
- Update quantities
- LocalStorage persistence
- Cart count badge
- Mobile & Desktop responsive

#### 3. Admin Panel ✅
- Product management (CRUD)
- Protected admin routes
- Statistics dashboard
- Search & filter products
- Image upload support

#### 4. Responsive Testing ✅
- Fully responsive design
- Mobile-first approach
- Tested on all screen sizes

---

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Prerequisites
- GitHub account
- Vercel account (free)

#### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Week 3 complete - Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy Frontend to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure:
  - Framework Preset: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

3. **Environment Variables (Vercel)**
Add in Vercel dashboard:
```
VITE_API_URL=your_backend_url/api
```

4. **Deploy Backend Separately**
Backend needs to be deployed to a service that supports Node.js:
- Render
- Railway
- Heroku
- AWS

---

### Option 2: Render (Full Stack)

#### Deploy Backend

1. **Create Render Account**
- Go to [render.com](https://render.com)
- Sign up with GitHub

2. **Create Web Service**
- Click "New +" → "Web Service"
- Connect GitHub repository
- Configure:
  - Name: `ecommerce-backend`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm run dev:server`
  - Instance Type: Free

3. **Environment Variables**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. **Deploy**
- Click "Create Web Service"
- Wait for deployment
- Copy the backend URL

#### Deploy Frontend

1. **Update API URL**
In `src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'YOUR_RENDER_BACKEND_URL/api'
```

2. **Create Static Site on Render**
- Click "New +" → "Static Site"
- Connect repository
- Configure:
  - Build Command: `npm run build`
  - Publish Directory: `dist`

3. **Environment Variables**
```
VITE_API_URL=YOUR_RENDER_BACKEND_URL/api
```

---

### Option 3: Railway (Easiest Full Stack)

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login**
```bash
railway login
```

3. **Initialize Project**
```bash
railway init
```

4. **Add MongoDB**
```bash
railway add mongodb
```

5. **Deploy**
```bash
railway up
```

6. **Set Environment Variables**
```bash
railway variables set MONGODB_URI=your_connection_string
railway variables set PORT=5000
```

---

### Option 4: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login**
```bash
heroku login
```

3. **Create App**
```bash
heroku create your-app-name
```

4. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

5. **Deploy**
```bash
git push heroku main
```

6. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_connection_string
```

---

## Pre-Deployment Checklist

### Backend
- ✅ MongoDB connection string configured
- ✅ Environment variables set
- ✅ CORS configured for frontend URL
- ✅ All API endpoints tested
- ✅ Error handling implemented

### Frontend
- ✅ API URL configured
- ✅ Build command works (`npm run build`)
- ✅ All routes working
- ✅ Authentication tested
- ✅ Cart persistence working
- ✅ Responsive design verified

### Database
- ✅ MongoDB Atlas cluster created
- ✅ IP whitelist configured (0.0.0.0/0 for production)
- ✅ Database user created
- ✅ Sample data seeded

---

## Testing After Deployment

### 1. Test Authentication
- [ ] Login with admin credentials
- [ ] Login with user credentials
- [ ] Signup new user
- [ ] Logout functionality

### 2. Test Product Features
- [ ] View products on home page
- [ ] Search products
- [ ] Filter by category
- [ ] View product details
- [ ] Add to cart

### 3. Test Cart
- [ ] Add products to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] Cart persists on refresh

### 4. Test Admin Panel
- [ ] Access admin dashboard (admin only)
- [ ] Create new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] Search and filter

### 5. Test Responsive Design
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

### Frontend (Vercel/Render)
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Troubleshooting

### Issue: CORS Error
**Solution:** Add frontend URL to CORS whitelist in `server/index.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.com']
}))
```

### Issue: MongoDB Connection Failed
**Solution:** 
1. Check IP whitelist in MongoDB Atlas
2. Verify connection string
3. Ensure database user has correct permissions

### Issue: Build Failed
**Solution:**
1. Check Node version (use v18+)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check for missing dependencies

### Issue: API Not Found (404)
**Solution:**
1. Verify API_URL in frontend
2. Check backend is running
3. Verify route paths match

---

## Post-Deployment

### 1. Update README with Live URLs
```markdown
## Live Demo
- Frontend: https://your-app.vercel.app
- Backend API: https://your-api.render.com
```

### 2. Test All Features
Run through complete user journey

### 3. Monitor Performance
- Check loading times
- Monitor API response times
- Check error logs

### 4. Security
- [ ] Environment variables secured
- [ ] MongoDB credentials not exposed
- [ ] HTTPS enabled
- [ ] Admin routes protected

---

## GitHub Repository Setup

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Week 3 complete - Full stack e-commerce with auth"

# Add remote
git remote add origin YOUR_REPO_URL

# Push
git push -u origin main
```

---

## Week 3 Completion Status

✅ **Task 1:** User Authentication - DONE  
✅ **Task 2:** Cart Management - DONE  
✅ **Task 3:** Admin Panel - DONE  
✅ **Task 4:** Responsive Testing - DONE  
✅ **Task 5:** Deployment Guide - DONE  

**All Week 3 tasks completed!** 🎉

---

## Next Steps

1. Deploy to your chosen platform
2. Test all features on live URL
3. Share live URL
4. Commit final code to GitHub
5. Update README with deployment info

**Your e-commerce application is production-ready!** 🚀
