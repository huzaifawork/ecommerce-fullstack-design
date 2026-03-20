import mongoose from 'mongoose';
import Product from '../server/models/Product.js';
import User from '../server/models/User.js';
import jwt from 'jsonwebtoken';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const { path } = req.query;
    const route = Array.isArray(path) ? path.join('/') : (path || '');

    // Products routes
    if (route.startsWith('products') || route === 'products') {
      const parts = route.split('/');
      
      if (req.method === 'GET' && parts.length === 1) {
        // GET all products
        const { category, minPrice, maxPrice, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = Number(minPrice);
          if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        const products = await Product.find(query).sort({ createdAt: -1 });
        return res.json(products);
      }
      
      if (req.method === 'GET' && parts.length === 2) {
        // GET single product
        const product = await Product.findById(parts[1]);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        return res.json(product);
      }
      
      if (req.method === 'POST' && parts.length === 1) {
        // CREATE product
        const product = new Product(req.body);
        const newProduct = await product.save();
        return res.status(201).json(newProduct);
      }
      
      if (req.method === 'PUT' && parts.length === 2) {
        // UPDATE product
        const product = await Product.findById(parts[1]);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        return res.json(updatedProduct);
      }
      
      if (req.method === 'DELETE' && parts.length === 2) {
        // DELETE product
        const product = await Product.findById(parts[1]);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await product.deleteOne();
        return res.json({ message: 'Product deleted successfully' });
      }
    }

    // Auth routes
    if (route.startsWith('auth')) {
      const parts = route.split('/');
      
      if (req.method === 'POST' && parts[1] === 'signup') {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please provide all fields' });
        }
        if (password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, role: 'user' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token
        });
      }
      
      if (req.method === 'POST' && parts[1] === 'login') {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ message: 'Please provide email and password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token
        });
      }
      
      if (req.method === 'GET' && parts[1] === 'me') {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'Not authorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
      }
    }

    return res.status(404).json({ message: 'Route not found' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: error.message });
  }
}
