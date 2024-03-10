-- Insert data into the 'gender' table
INSERT INTO gender (type) VALUES ('Female'), ('Male'), ('Non-Binary');

-- Insert data into the 'role' table
INSERT INTO role (type) VALUES ('Admin'), ('User'), ('Guest');

-- Insert data into the 'brand' table
INSERT INTO brand (name, image_url, is_active) VALUES 
('BrandA', 'http://example.com/brand_a.png', 1),
('BrandB', 'http://example.com/brand_b.png', 1);

-- Insert data into the 'category' table
INSERT INTO category (name, image_url, is_active) VALUES 
('Electronics', 'http://example.com/electronics.png', 1),
('Clothing', 'http://example.com/clothing.png', 1);

-- Insert data into the 'model' table
INSERT INTO model (name) VALUES ('ModelA'), ('ModelB');

-- Insert data into the 'color' table
INSERT INTO color (color_code) VALUES ('#FFFFFF'), ('#000000');

-- Insert data into the 'payment_method' table
INSERT INTO payment_method (type, is_active) VALUES 
('Credit Card', 1),
('PayPal', 1);

-- Insert data into the 'users' table, make sure to hash passwords before inserting
INSERT INTO users (name, email, password_hash, gender_id, dob, role_id, is_verified, is_active) VALUES 
('John Doe', 'john.doe@example.com', 'hashed_password', 1, '1980-01-01', 2, 1, 1),
('Jane Smith', 'jane.smith@example.com', 'hashed_password', 2, '1985-02-02', 2, 1, 1);

-- Insert data into the 'products' table
INSERT INTO products (name, description, original_price, sale_price, discount_type, discount_value, release_date, brand_id, category_id, model_id, color_id, is_active) VALUES 
('ProductA', 'Description of ProductA', 100, 90, 'Percentage', 10, '2024-01-01', 1, 1, 1, 1, 1),
('ProductB', 'Description of ProductB', 200, null, null, null, '2024-01-02', 2, 2, 2, 2, 1);

-- Insert data into the 'orders' table
INSERT INTO orders (status, payment_method_id, total_price, remarks, user_id, is_active) VALUES 
('Completed', 1, 190, 'Delivered on time', 1, 1),
('Processing', 2, 200, 'Urgent delivery', 2, 1);

-- Insert data into the 'order_details' table
INSERT INTO order_details (product_id, order_id, quantity, price) VALUES 
(1, 1, 1, 90),
(2, 2, 1, 200);

-- Insert data into the 'product_review' table
INSERT INTO product_review (rating, comments, product_id, user_id, is_active) VALUES 
(5, 'Excellent product!', 1, 1, 1),
(4, 'Good quality.', 2, 2, 1);

-- Insert data into the 'image' table
INSERT INTO image (image_url, product_id) VALUES 
('http://example.com/product_a.png', 1),
('http://example.com/product_b.png', 2);
