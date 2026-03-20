# Vercel Deployment Guide - Step by Step

## 🚀 Deploy Your E-Commerce App to Vercel

---

## IMPORTANT: Two-Part Deployment

Since you have both frontend (React) and backend (Node.js), you need:
1. **Frontend on Vercel** (React app)
2. **Backend on Render/Railway** (Node.js API)

Vercel is best for frontend. Backend needs a different platform.

---

## Part 1: Deploy Backend (Choose One)

### Option A: Deploy Backend on Render (Recommended)

#### Step 1: Push Code to GitHub First
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub (github.com/new)
# Then add remote and push:
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

#### Step 2: Deploy Backend on Render
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** `ecommerce-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Instance Type:** Free

6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://mhuzaifatariq7_db_user:C8lkJPTcLz3bELiV@ecommerce-cluster.vlbxn1m.mongodb.net/ecommerce?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. **Copy your backend URL** (e.g., `https://ecommerce-backend-xxxx.onrender.com`)

---

### Option B: Deploy Backend on Railway (Faster)

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login and Deploy
```bash
# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set MONGODB_URI="mongodb+srv://mhuzaifatariq7_db_user:C8lkJPTcLz3bELiV@ecommerce-cluster.vlbxn1m.mongodb.net/ecommerce?retryWrites=true&w=majority"
railway variables set JWT_SECRET="your-super-secret-jwt-key"
railway variables set PORT=5000

# Deploy
railway up

# Get your backend URL
railway domain
```

**Copy your backend URL** (e.g., `https://your-app.railway.app`)

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Update API URL in Frontend

Create `.env.production` file:
```bash
# In project root
echo VITE_API_URL=YOUR_BACKEND_URL/api > .env.production
```

Replace `YOUR_BACKEND_URL` with your Render/Railway URL.

Example:
```
VITE_API_URL=https://ecommerce-backend-xxxx.onrender.com/api
```

### Step 2: Update CORS in Backend

Edit `server/index.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-vercel-app.vercel.app'],
  credentials: true
}));
```

Commit and push changes:
```bash
git add .
git commit -m "Update CORS and API URL"
git push
```

### Step 3: Deploy Frontend on Vercel

#### Option A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ecommerce-frontend
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard (Easier)

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. Add Environment Variable:
   ```
   VITE_API_URL=YOUR_BACKEND_URL/api
   ```
   (Replace with your Render/Railway URL)

7. Click "Deploy"
8. Wait 2-3 minutes
9. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

---

## Step 4: Update Backend CORS with Vercel URL

After getting your Vercel URL, update `server/index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Add Vercel URL to CORS"
git push
```

Backend will auto-redeploy on Render/Railway.

---

## Step 5: Test Your Deployed App

1. Go to your Vercel URL
2. Test features:
   - [ ] Homepage loads
   - [ ] Products display
   - [ ] Search works
   - [ ] Signup works
   - [ ] Login works
   - [ ] Add to cart works
   - [ ] Admin panel works (login as admin)

---

## 🐛 Troubleshooting

### Issue: Products not loading
**Solution:** 
- Check backend URL in `.env.production`
- Check backend is running on Render/Railway
- Check browser console for errors

### Issue: CORS error
**Solution:**
- Add your Vercel URL to CORS in `server/index.js`
- Redeploy backend

### Issue: Authentication not working
**Solution:**
- Check JWT_SECRET is set in backend environment variables
- Check API URL is correct
- Clear browser cache and try again

### Issue: Admin user not found
**Solution:**
Run on backend (Render/Railway):
```bash
npm run seed:admin
```

---

## 📝 Quick Checklist

### Backend (Render/Railway):
- [ ] Code pushed to GitHub
- [ ] Backend deployed
- [ ] Environment variables set (MONGODB_URI, JWT_SECRET, PORT)
- [ ] Backend URL copied
- [ ] Admin user created (`npm run seed:admin`)

### Frontend (Vercel):
- [ ] `.env.production` created with backend URL
- [ ] CORS updated in backend
- [ ] Frontend deployed
- [ ] Frontend URL copied
- [ ] All features tested

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Frontend: `https://your-app.vercel.app`
- ✅ Backend: `https://your-backend.onrender.com` or `https://your-app.railway.app`

Share your live URLs! 🚀

---

## 📞 Need Help?

Common commands:
```bash
# Redeploy frontend
vercel --prod

# Check backend logs (Render)
# Go to Render dashboard → Your service → Logs

# Check backend logs (Railway)
railway logs
```

---

**You're ready to deploy! Follow the steps above.** 🚀
