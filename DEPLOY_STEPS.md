# Quick Deployment Commands

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment - Week 3 complete"

# Create new repository on GitHub: https://github.com/new
# Name it: ecommerce-fullstack-app

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-fullstack-app.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Settings:
   - Name: `ecommerce-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   
6. Environment Variables (click "Advanced"):
   ```
   MONGODB_URI = mongodb+srv://mhuzaifatariq7_db_user:C8lkJPTcLz3bELiV@ecommerce-cluster.vlbxn1m.mongodb.net/ecommerce?retryWrites=true&w=majority
   JWT_SECRET = your-super-secret-jwt-key-change-this
   PORT = 5000
   ```

7. Click "Create Web Service"
8. Wait 5-10 minutes
9. **COPY YOUR BACKEND URL** (e.g., https://ecommerce-backend-xxxx.onrender.com)

---

## Step 3: Update Frontend with Backend URL

Edit `.env.production`:
```
VITE_API_URL=https://ecommerce-backend-xxxx.onrender.com/api
```
(Replace with YOUR backend URL from Render)

Commit and push:
```bash
git add .
git commit -m "Add production API URL"
git push
```

---

## Step 4: Deploy Frontend on Vercel

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option B: Using Vercel Dashboard
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   
6. Environment Variables:
   ```
   VITE_API_URL = https://ecommerce-backend-xxxx.onrender.com/api
   ```
   (Use YOUR backend URL)

7. Click "Deploy"
8. Wait 2-3 minutes
9. **COPY YOUR FRONTEND URL** (e.g., https://your-app.vercel.app)

---

## Step 5: Update CORS in Backend

Edit `server/index.js`, find the cors section and update:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'  // Add your Vercel URL here
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

Render will auto-redeploy.

---

## Step 6: Create Admin User on Production

In Render dashboard:
1. Go to your backend service
2. Click "Shell" tab
3. Run:
   ```bash
   npm run seed:admin
   ```

---

## Step 7: Test Your Live App!

Go to your Vercel URL and test:
- [ ] Homepage loads
- [ ] Products display
- [ ] Search works
- [ ] Signup works
- [ ] Login works (admin@ecommerce.com / admin123)
- [ ] Add to cart works
- [ ] Admin panel works

---

## 🎉 Done!

Your app is live at:
- Frontend: https://your-app.vercel.app
- Backend: https://ecommerce-backend-xxxx.onrender.com

Share your URLs! 🚀

---

## Quick Redeploy Commands

```bash
# Redeploy frontend
vercel --prod

# Redeploy backend (just push to GitHub)
git add .
git commit -m "Update"
git push
```

---

## Troubleshooting

### Products not loading?
- Check backend URL in `.env.production`
- Check backend is running on Render
- Check browser console for errors

### CORS error?
- Make sure you added Vercel URL to CORS in `server/index.js`
- Redeploy backend

### Can't login?
- Make sure you ran `npm run seed:admin` on Render
- Check JWT_SECRET is set in Render environment variables

---

**Follow these steps in order and you'll be deployed!** 🚀
