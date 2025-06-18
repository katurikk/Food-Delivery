-- Insert sample users
INSERT INTO users (name, email, password, phone)
VALUES 
('Karthik', 'karthik@example.com', 'hashedpassword123', '9876543210'),
('Arun', 'arun@example.com', 'hashedpassword456', '9876543211');

-- Insert sample addresses
INSERT INTO addresses (user_id, type, addressLine1, addressLine2, city, state, pincode, latitude, longitude)
VALUES 
(1, 'Home', '123 Street', 'Near Park', 'Hyderabad', 'Telangana', '500001', 17.385044, 78.486671),
(2, 'Work', '456 Avenue', 'Opp Mall', 'Vijayawada', 'Andhra Pradesh', '520001', 16.506174, 80.648015);

-- Insert sample restaurants
INSERT INTO restaurants (name, cuisine, description, address, latitude, longitude, opening_time, closing_time, min_order_amount, delivery_fee, avg_preparation_time)
VALUES 
('Biryani House', 'Indian', 'Best biryani in town', '456 Food Street', 17.385044, 78.486671, '10:00 AM', '11:00 PM', 200, 30, 20),
('Pizza Plaza', 'Italian', 'Authentic wood-fired pizza', '789 Pizza Road', 16.506174, 80.648015, '11:00 AM', '10:00 PM', 300, 40, 25);

-- Insert sample menu categories
INSERT INTO menu_categories (restaurant_id, name, display_order)
VALUES 
(1, 'Biryani Specials', 1),
(1, 'Starters', 2),
(2, 'Pizzas', 1),
(2, 'Drinks', 2);

-- Insert sample menu items
INSERT INTO menu_items (category_id, name, description, price, isVeg, isAvailable, image)
VALUES 
(1, 'Chicken Biryani', 'Spicy Hyderabadi biryani', 250, 0, 1, 'biryani.jpg'),
(1, 'Veg Biryani', 'Delicious vegetable biryani', 200, 1, 1, 'veg_biryani.jpg'),
(2, 'Paneer Tikka', 'Grilled paneer cubes', 150, 1, 1, 'paneer_tikka.jpg'),
(3, 'Margherita Pizza', 'Classic cheese pizza', 300, 1, 1, 'pizza.jpg'),
(4, 'Coke', 'Chilled 500ml', 50, 1, 1, 'coke.jpg');

-- Insert sample cart items
INSERT INTO cart (user_id, restaurant_id, item_id, quantity, special_instructions)
VALUES 
(1, 1, 1, 2, 'Extra spicy'),
(1, 1, 2, 1, '');

-- Insert sample orders
INSERT INTO orders (order_id, user_id, restaurant_id, address_id, total_amount, delivery_fee, payment_method, special_instructions, status)
VALUES 
('ORD1234', 1, 1, 1, 500, 30, 'COD', 'Handle with care', 'placed');

-- Insert sample order items
INSERT INTO order_items (order_id, item_id, quantity, price)
VALUES 
('ORD1234', 1, 2, 250),
('ORD1234', 2, 1, 200);

-- Insert delivery partners
INSERT INTO delivery_partners (name, phone, status, latitude, longitude)
VALUES 
('Ravi', '9876543212', 'available', 17.385044, 78.486671),
('Sita', '9876543213', 'available', 16.506174, 80.648015);

-- Insert order tracking
INSERT INTO order_tracking (order_id, status)
VALUES 
('ORD1234', 'placed'),
('ORD1234', 'preparing');

-- Insert payments
INSERT INTO payments (order_id, method, status)
VALUES 
('ORD1234', 'COD', 'pending');

-- Insert reviews
INSERT INTO reviews (order_id, restaurant_rating, food_rating, delivery_rating, comment)
VALUES 
('ORD1234', 5, 5, 4, 'Tasty food, timely delivery!');
