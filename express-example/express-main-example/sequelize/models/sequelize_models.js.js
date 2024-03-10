const { DataTypes } = require('sequelize');

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize({ /* ... Your SQLite DB Configuration ... */ });

// User Model
const User = sequelize.define('user', {
  // Assuming id is automatically generated
  name: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  password_hash: Sequelize.STRING,
  gender_id: { type: Sequelize.INTEGER, allowNull: true },
  dob: Sequelize.DATEONLY,
  role_id: { type: Sequelize.INTEGER, allowNull: true },
  is_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// And similarly for other models...



// Brand Model
const Brand = sequelize.define('brand', {
  name: Sequelize.STRING,
  image_url: Sequelize.STRING,
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// Category Model
const Category = sequelize.define('category', {
  name: Sequelize.STRING,
  image_url: Sequelize.STRING,
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// Product Model
const Product = sequelize.define('product', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  original_price: Sequelize.INTEGER,
  sale_price: Sequelize.INTEGER,
  discount_type: Sequelize.STRING,
  discount_value: Sequelize.INTEGER,
  release_date: Sequelize.DATEONLY,
  brand_id: Sequelize.INTEGER,
  category_id: Sequelize.INTEGER,
  model_id: Sequelize.INTEGER,
  color_id: Sequelize.INTEGER,
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// Product Review Model
const ProductReview = sequelize.define('product_review', {
  rating: Sequelize.INTEGER,
  comments: Sequelize.TEXT,
  product_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// Order Model
const Order = sequelize.define('order', {
  status: Sequelize.STRING,
  payment_method_id: Sequelize.INTEGER,
  total_price: Sequelize.INTEGER,
  remarks: Sequelize.TEXT,
  user_id: Sequelize.INTEGER,
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// Order Detail Model
const OrderDetail = sequelize.define('order_detail', {
  product_id: { type: Sequelize.INTEGER, primaryKey: true },
  order_id: { type: Sequelize.INTEGER, primaryKey: true },
  quantity: Sequelize.INTEGER,
  price: Sequelize.INTEGER
  // No need to add created_at or updated_at for a join table
}, {
  timestamps: false // this table does not require timestamps
});

// Model Table Model
const ModelTable = sequelize.define('model', {
  name: Sequelize.STRING
  // Timestamps added by default
}, {
  // options
});

// Color Model
const Color = sequelize.define('color', {
  color_code: Sequelize.STRING
  // Timestamps added by default
}, {
  // options
});

// Payment Method Model
const PaymentMethod = sequelize.define('payment_method', {
  type: Sequelize.STRING,
  is_active: { type: Sequelize.BOOLEAN, defaultValue: true }
  // Timestamps added by default
}, {
  // options
});

// Image Model
const Image = sequelize.define('image', {
  image_url: Sequelize.STRING,
  product_id: Sequelize.INTEGER
  // Timestamps added by default
}, {
  // options
});

// Define associations
// For example, associating a product with its brand, category, model, color, etc.
Product.belongsTo(Brand, { foreignKey: 'brand_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });
Product.belongsTo(ModelTable, { foreignKey: 'model_id' });
Product.belongsTo(Color, { foreignKey: 'color_id' });

// And similarly for other associations...

// Sync all models with the database
sequelize.sync();
