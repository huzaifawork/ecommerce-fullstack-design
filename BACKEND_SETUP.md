# Backend Setup Instructions

## MongoDB Atlas Connection
✅ Connected to: `ecommerce-cluster.vlbxn1m.mongodb.net`
✅ Database: `ecommerce`

## Installation Steps

1. **Install mongoose dependency:**
```bash
npm install mongoose
```

2. **Seed the database with sample products:**
```bash
npm run seed
```

3. **Start the backend server:**
```bash
npm run dev:server
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
  - Query params: `category`, `minPrice`, `maxPrice`, `search`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search/:query` - Search products
- `POST /api/products/:id/reviews` - Add review to product

## Product Schema

```javascript
{
  name: String,              // Product name
  description: String,       // Product details
  price: Number,            // Product price
  category: String,         // Product category
  images: [String],         // Array of image URLs
  stock: Number,            // Inventory count
  rating: Number,           // Average rating (calculated)
  reviews: [                // User reviews
    {
      user: String,
      rating: Number,
      comment: String
    }
  ]
}
```

## Testing the API

Use Postman, Thunder Client, or curl to test:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/:id

# Search products
curl http://localhost:5000/api/products/search/shirt
```

## Next Steps
1. Install mongoose: `npm install mongoose`
2. Run seed script: `npm run seed`
3. Start server: `npm run dev:server`
4. Test API endpoints
5. Integrate with frontend
