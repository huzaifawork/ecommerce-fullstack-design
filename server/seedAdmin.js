import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/User.js'

dotenv.config()

const createAdminUser = async () => {
  try {
    await connectDB()
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@ecommerce.com' })
    
    if (adminExists) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin'
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@ecommerce.com')
    console.log('Password: admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
