# ecommerce-fullstack-design

Full-stack e-commerce app — React frontend + Express backend in a single unified repo.

## Structure

```
ecommerce-fullstack-design/
├── src/                  # React frontend
│   ├── components/       # Navbar, Footer, ProductCard
│   ├── pages/            # Home, ProductListing, ProductDetails, Cart
│   ├── data/             # Mock product data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/               # Express backend
│   └── index.js
├── public/               # Static assets
├── index.html
├── vite.config.js
├── package.json          # Single package.json for everything
└── .env
```

## Install

```bash
npm install --legacy-peer-deps
```

## Run

```bash
# React dev server → http://localhost:5173
npm run dev

# Express server → http://localhost:5000
npm run dev:server
```

## Build

```bash
npm run build
```
