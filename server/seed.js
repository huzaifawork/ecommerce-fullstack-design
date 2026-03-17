import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  // Electronics - Smartphones
  {
    name: 'iPhone 14 Pro Max 256GB',
    description: 'Latest iPhone with A16 Bionic chip, ProMotion display, and advanced camera system. Features Dynamic Island and always-on display.',
    price: 1199.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1592286927505-2fd0d113e4e7?w=400&h=400&fit=crop'
    ],
    stock: 25,
    rating: 4.9,
    reviews: [
      { user: 'John Smith', rating: 5, comment: 'Best iPhone yet! Camera is incredible.' },
      { user: 'Sarah Johnson', rating: 5, comment: 'Worth every penny!' }
    ]
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Flagship Android phone with S Pen, 200MP camera, and powerful Snapdragon processor. 5G enabled with long battery life.',
    price: 1099.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop'
    ],
    stock: 30,
    rating: 4.8,
    reviews: [
      { user: 'Mike Chen', rating: 5, comment: 'Amazing camera quality!' }
    ]
  },
  {
    name: 'Google Pixel 8 Pro',
    description: 'Pure Android experience with Google AI features. Excellent camera with Magic Eraser and Night Sight.',
    price: 899.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop'
    ],
    stock: 20,
    rating: 4.7,
    reviews: [
      { user: 'Emily Davis', rating: 5, comment: 'Best Android camera!' }
    ]
  },

  // Electronics - Laptops
  {
    name: 'MacBook Pro 16" M3 Max',
    description: 'Professional laptop with M3 Max chip, 36GB RAM, 1TB SSD. Perfect for video editing and development.',
    price: 3499.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
    ],
    stock: 15,
    rating: 5.0,
    reviews: [
      { user: 'David Wilson', rating: 5, comment: 'Blazing fast performance!' }
    ]
  },
  {
    name: 'Dell XPS 15 Gaming Laptop',
    description: 'High-performance laptop with RTX 4060, Intel i9, 32GB RAM. Perfect for gaming and creative work.',
    price: 2299.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop'
    ],
    stock: 18,
    rating: 4.6,
    reviews: [
      { user: 'Alex Turner', rating: 5, comment: 'Great for gaming!' }
    ]
  },
  {
    name: 'HP Pavilion 14 Business Laptop',
    description: 'Reliable business laptop with Intel i7, 16GB RAM, and 512GB SSD. Long battery life and lightweight design.',
    price: 899.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
    ],
    stock: 35,
    rating: 4.4,
    reviews: [
      { user: 'Lisa Brown', rating: 4, comment: 'Good value for money.' }
    ]
  },

  // Electronics - Tablets
  {
    name: 'iPad Pro 12.9" M2',
    description: 'Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
    price: 1099.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'
    ],
    stock: 22,
    rating: 4.9,
    reviews: [
      { user: 'Rachel Green', rating: 5, comment: 'Perfect for digital art!' }
    ]
  },
  {
    name: 'Samsung Galaxy Tab S9',
    description: 'Premium Android tablet with S Pen included. Great for productivity and entertainment.',
    price: 799.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop'
    ],
    stock: 28,
    rating: 4.7,
    reviews: [
      { user: 'Tom Harris', rating: 5, comment: 'Best Android tablet!' }
    ]
  },

  // Electronics - Smartwatches
  {
    name: 'Apple Watch Series 9 GPS',
    description: 'Advanced health tracking with ECG, blood oxygen, and sleep monitoring. Always-on Retina display.',
    price: 429.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'
    ],
    stock: 40,
    rating: 4.8,
    reviews: [
      { user: 'Jennifer Lee', rating: 5, comment: 'Love the health features!' }
    ]
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Stylish smartwatch with comprehensive health tracking and long battery life.',
    price: 299.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    ],
    stock: 35,
    rating: 4.6,
    reviews: [
      { user: 'Chris Martin', rating: 5, comment: 'Great battery life!' }
    ]
  },

  // Electronics - Headphones
  {
    name: 'Sony WH-1000XM5 Noise Cancelling',
    description: 'Industry-leading noise cancellation with exceptional sound quality. 30-hour battery life.',
    price: 399.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    ],
    stock: 45,
    rating: 4.9,
    reviews: [
      { user: 'Mark Johnson', rating: 5, comment: 'Best headphones ever!' }
    ]
  },
  {
    name: 'AirPods Pro 2nd Generation',
    description: 'Premium wireless earbuds with active noise cancellation and spatial audio.',
    price: 249.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop'
    ],
    stock: 50,
    rating: 4.8,
    reviews: [
      { user: 'Amy Wilson', rating: 5, comment: 'Perfect fit and sound!' }
    ]
  },
  {
    name: 'Bose QuietComfort 45',
    description: 'Comfortable over-ear headphones with excellent noise cancellation and balanced sound.',
    price: 329.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
    ],
    stock: 30,
    rating: 4.7,
    reviews: [
      { user: 'Kevin Brown', rating: 5, comment: 'Super comfortable!' }
    ]
  },

  // Electronics - Cameras
  {
    name: 'GoPro HERO12 Black',
    description: 'Professional action camera with 5.3K video, HyperSmooth stabilization, and waterproof design.',
    price: 399.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'
    ],
    stock: 25,
    rating: 4.8,
    reviews: [
      { user: 'Jake Peralta', rating: 5, comment: 'Amazing for adventures!' }
    ]
  },
  {
    name: 'Canon EOS R6 Mark II',
    description: 'Professional mirrorless camera with 24MP sensor and advanced autofocus system.',
    price: 2499.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop'
    ],
    stock: 12,
    rating: 5.0,
    reviews: [
      { user: 'Monica Geller', rating: 5, comment: 'Professional quality!' }
    ]
  },

  // Clothing - T-Shirts
  {
    name: 'Classic Cotton T-Shirt Pack (3)',
    description: 'Premium 100% cotton t-shirts in multiple colors. Comfortable fit for everyday wear.',
    price: 39.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
    ],
    stock: 100,
    rating: 4.5,
    reviews: [
      { user: 'Ross Geller', rating: 5, comment: 'Great quality cotton!' }
    ]
  },
  {
    name: 'Graphic Print T-Shirt',
    description: 'Trendy graphic t-shirt with modern designs. Soft fabric and vibrant colors.',
    price: 24.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop'
    ],
    stock: 80,
    rating: 4.4,
    reviews: [
      { user: 'Phoebe Buffay', rating: 4, comment: 'Cool designs!' }
    ]
  },
  {
    name: 'V-Neck Premium T-Shirt',
    description: 'Elegant v-neck t-shirt perfect for casual and semi-formal occasions.',
    price: 29.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop'
    ],
    stock: 60,
    rating: 4.6,
    reviews: [
      { user: 'Joey Tribbiani', rating: 5, comment: 'Fits perfectly!' }
    ]
  },

  // Clothing - Shirts
  {
    name: 'Formal Business Shirt White',
    description: 'Professional dress shirt perfect for office wear. Wrinkle-resistant fabric.',
    price: 49.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'
    ],
    stock: 45,
    rating: 4.7,
    reviews: [
      { user: 'Chandler Bing', rating: 5, comment: 'Great for work!' }
    ]
  },
  {
    name: 'Casual Denim Shirt',
    description: 'Stylish denim shirt for casual outings. Comfortable and durable.',
    price: 44.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'
    ],
    stock: 55,
    rating: 4.5,
    reviews: [
      { user: 'Terry Jeffords', rating: 4, comment: 'Nice casual look!' }
    ]
  },

  // Clothing - Jackets
  {
    name: 'Leather Jacket Brown',
    description: 'Classic leather jacket with premium quality. Perfect for all seasons.',
    price: 199.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'
    ],
    stock: 20,
    rating: 4.9,
    reviews: [
      { user: 'Amy Santiago', rating: 5, comment: 'Love this jacket!' }
    ]
  },
  {
    name: 'Winter Puffer Jacket',
    description: 'Warm insulated jacket perfect for cold weather. Water-resistant and lightweight.',
    price: 129.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop'
    ],
    stock: 35,
    rating: 4.7,
    reviews: [
      { user: 'Rosa Diaz', rating: 5, comment: 'Very warm!' }
    ]
  },

  // Clothing - Suits
  {
    name: 'Men Business Suit Navy Blue',
    description: 'Professional 2-piece suit perfect for business meetings and formal events.',
    price: 299.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop'
    ],
    stock: 25,
    rating: 4.8,
    reviews: [
      { user: 'Raymond Holt', rating: 5, comment: 'Excellent quality suit!' }
    ]
  },
  {
    name: 'Slim Fit Blazer Black',
    description: 'Modern slim-fit blazer for a sharp professional look.',
    price: 149.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop'
    ],
    stock: 30,
    rating: 4.6,
    reviews: [
      { user: 'Charles Boyle', rating: 5, comment: 'Perfect fit!' }
    ]
  },

  // Footwear
  {
    name: 'Nike Air Max 270 Running Shoes',
    description: 'Comfortable running shoes with air cushioning. Perfect for daily workouts.',
    price: 149.99,
    category: 'Footwear',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
    ],
    stock: 60,
    rating: 4.8,
    reviews: [
      { user: 'Michael Scott', rating: 5, comment: 'Best running shoes!' }
    ]
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Premium running shoes with boost technology for maximum comfort.',
    price: 179.99,
    category: 'Footwear',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop'
    ],
    stock: 45,
    rating: 4.9,
    reviews: [
      { user: 'Jim Halpert', rating: 5, comment: 'Super comfortable!' }
    ]
  },
  {
    name: 'Formal Leather Shoes Oxford',
    description: 'Classic oxford shoes perfect for formal occasions and office wear.',
    price: 89.99,
    category: 'Footwear',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop'
    ],
    stock: 40,
    rating: 4.6,
    reviews: [
      { user: 'Dwight Schrute', rating: 5, comment: 'Professional look!' }
    ]
  },
  {
    name: 'Casual Sneakers White',
    description: 'Versatile white sneakers perfect for everyday casual wear.',
    price: 69.99,
    category: 'Footwear',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    ],
    stock: 70,
    rating: 4.5,
    reviews: [
      { user: 'Pam Beesly', rating: 4, comment: 'Comfortable and stylish!' }
    ]
  },

  // Accessories - Bags
  {
    name: 'Leather Backpack Brown',
    description: 'Premium leather backpack with laptop compartment. Perfect for work and travel.',
    price: 129.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
    ],
    stock: 35,
    rating: 4.8,
    reviews: [
      { user: 'Andy Bernard', rating: 5, comment: 'Great quality leather!' }
    ]
  },
  {
    name: 'Canvas Messenger Bag',
    description: 'Durable canvas bag perfect for daily commute. Multiple pockets for organization.',
    price: 49.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'
    ],
    stock: 50,
    rating: 4.5,
    reviews: [
      { user: 'Stanley Hudson', rating: 4, comment: 'Good value!' }
    ]
  },
  {
    name: 'Travel Duffel Bag Large',
    description: 'Spacious duffel bag perfect for weekend trips and gym sessions.',
    price: 79.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop'
    ],
    stock: 40,
    rating: 4.7,
    reviews: [
      { user: 'Kevin Malone', rating: 5, comment: 'Fits everything!' }
    ]
  },

  // Accessories - Wallets
  {
    name: 'Genuine Leather Wallet Black',
    description: 'Classic bifold wallet with multiple card slots. RFID protection included.',
    price: 39.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop'
    ],
    stock: 80,
    rating: 4.6,
    reviews: [
      { user: 'Oscar Martinez', rating: 5, comment: 'Perfect size!' }
    ]
  },
  {
    name: 'Minimalist Card Holder',
    description: 'Slim card holder perfect for carrying essentials. Modern and compact design.',
    price: 24.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop'
    ],
    stock: 90,
    rating: 4.4,
    reviews: [
      { user: 'Angela Martin', rating: 4, comment: 'Very slim and practical!' }
    ]
  },

  // Accessories - Watches
  {
    name: 'Classic Analog Watch Silver',
    description: 'Elegant analog watch with stainless steel band. Water-resistant design.',
    price: 149.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop'
    ],
    stock: 30,
    rating: 4.7,
    reviews: [
      { user: 'Toby Flenderson', rating: 5, comment: 'Beautiful watch!' }
    ]
  },
  {
    name: 'Sports Digital Watch',
    description: 'Durable sports watch with multiple functions. Perfect for outdoor activities.',
    price: 59.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop'
    ],
    stock: 55,
    rating: 4.5,
    reviews: [
      { user: 'Darryl Philbin', rating: 4, comment: 'Great for workouts!' }
    ]
  },

  // Accessories - Sunglasses
  {
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV protection. Iconic style and comfort.',
    price: 159.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop'
    ],
    stock: 45,
    rating: 4.9,
    reviews: [
      { user: 'Ryan Howard', rating: 5, comment: 'Timeless style!' }
    ]
  },
  {
    name: 'Polarized Sports Sunglasses',
    description: 'High-performance sunglasses perfect for sports and outdoor activities.',
    price: 79.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'
    ],
    stock: 60,
    rating: 4.6,
    reviews: [
      { user: 'Kelly Kapoor', rating: 5, comment: 'Perfect for running!' }
    ]
  },

  // Accessories - Belts
  {
    name: 'Leather Belt Brown Classic',
    description: 'Premium leather belt with classic buckle. Perfect for formal and casual wear.',
    price: 34.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
    ],
    stock: 70,
    rating: 4.5,
    reviews: [
      { user: 'Creed Bratton', rating: 4, comment: 'Good quality leather!' }
    ]
  },

  // Accessories - Socks
  {
    name: 'Athletic Crew Socks Pack (6)',
    description: 'Comfortable athletic socks with moisture-wicking technology. Perfect for sports.',
    price: 19.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop'
    ],
    stock: 120,
    rating: 4.4,
    reviews: [
      { user: 'Meredith Palmer', rating: 4, comment: 'Very comfortable!' }
    ]
  },

  // Accessories - Water Bottles
  {
    name: 'Insulated Water Bottle 32oz',
    description: 'Stainless steel water bottle keeps drinks cold for 24 hours. BPA-free and eco-friendly.',
    price: 29.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop'
    ],
    stock: 85,
    rating: 4.7,
    reviews: [
      { user: 'Phyllis Vance', rating: 5, comment: 'Keeps water cold all day!' }
    ]
  },

  // Home & Living
  {
    name: 'Wireless Bluetooth Speaker',
    description: 'Portable speaker with 360-degree sound. Waterproof and 12-hour battery life.',
    price: 79.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
    ],
    stock: 50,
    rating: 4.6,
    reviews: [
      { user: 'Erin Hannon', rating: 5, comment: 'Great sound quality!' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products added successfully`);

    // Calculate ratings for all products
    for (const product of products) {
      product.calculateAverageRating();
      await product.save();
    }
    console.log('Product ratings calculated');

    console.log('✅ Database seeded successfully with 40 products!');
    console.log('\nProducts by category:');
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const count = products.filter(p => p.category === cat).length;
      console.log(`  - ${cat}: ${count} products`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
