-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Addresses table
CREATE TABLE addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT,
    addressLine1 TEXT,
    addressLine2 TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    latitude REAL,
    longitude REAL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Restaurants table
CREATE TABLE restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    description TEXT,
    address TEXT,
    latitude REAL,
    longitude REAL,
    opening_time TEXT,
    closing_time TEXT,
    min_order_amount REAL,
    delivery_fee REAL,
    avg_preparation_time INTEGER,
    status TEXT DEFAULT 'open',
    rating REAL DEFAULT 0
);

-- Menu categories table
CREATE TABLE menu_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- Menu items table
CREATE TABLE menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    isVeg BOOLEAN,
    isAvailable BOOLEAN DEFAULT 1,
    image TEXT,
    FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

-- Cart table
CREATE TABLE cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    special_instructions TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL ,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    delivery_fee REAL NOT NULL,
    payment_method TEXT NOT NULL,
    special_instructions TEXT,
    status TEXT DEFAULT 'placed',
    ordered_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- Order items table
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

-- Delivery partners table
CREATE TABLE delivery_partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    status TEXT DEFAULT 'available',
    latitude REAL,
    longitude REAL
);

-- Order tracking table
CREATE TABLE order_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    status TEXT NOT NULL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Payments table
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    transaction_time TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Reviews table
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    restaurant_rating INTEGER,
    food_rating INTEGER,
    delivery_rating INTEGER,
    comment TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
