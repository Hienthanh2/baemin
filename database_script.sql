CREATE DATABASE baemin;

USE baemin;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE food_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE food_store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    rating_score DECIMAL(3,2) CHECK (rating_score BETWEEN 0 AND 5),
    min_price DECIMAL(10,2) NOT NULL,
    max_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    store_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES food_store(id) ON DELETE CASCADE
);

CREATE TABLE food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    store_id INT NOT NULL,
    food_category_id INT NOT NULL,
    menu_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES food_store(id) ON DELETE CASCADE,
    FOREIGN KEY (food_category_id) REFERENCES food_category(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

CREATE TABLE user_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    item_count INT NOT NULL CHECK (item_count > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food(id) ON DELETE CASCADE
);

-- Insert users
INSERT INTO user (first_name, last_name, username, phone_number, email, password)
VALUES 
('John', 'Doe', 'johndoe', '1234567890', 'johndoe@example.com', 'dummy'),
('Jane', 'Smith', 'janesmith', '0987654321', 'janesmith@example.com', 'dummy'),
('Alice', 'Johnson', 'alicej', '1112223333', 'alice@example.com', 'dummy'),
('Bob', 'Brown', 'bobb', '4445556666', 'bob@example.com', 'dummy'),
('Charlie', 'Davis', 'charlied', '7778889999', 'charlie@example.com', 'dummy');

-- Insert food categories
INSERT INTO food_category (name)
VALUES 
('Breakfast'),
('Desserts'),
('Fast Food'),
('Pizza'),
('Sushi'),
('Healthy Food');

-- Insert food stores
INSERT INTO food_store (name, address, open_time, close_time, rating_score, min_price, max_price)
VALUES 
('Tasty Bites', '123 Main St, City A', '07:00:00', '22:00:00', 4.5, 5.00, 30.00),
('Sweet Treats', '456 Sugar Rd, City B', '10:00:00', '23:00:00', 4.8, 3.00, 15.00),
('Pizza Heaven', '789 Pizza Ln, City C', '11:00:00', '00:00:00', 4.6, 8.00, 25.00),
('Sushi World', '321 Fish St, City D', '12:00:00', '22:00:00', 4.9, 10.00, 50.00),
('Healthy Bites', '654 Green Ave, City E', '08:00:00', '21:00:00', 4.7, 7.00, 20.00);

-- Insert menus
INSERT INTO menu (name, store_id)
VALUES 
-- Tasty Bites
('Breakfast Menu', 1),
('Lunch Menu', 1),
('Dinner Menu', 1),

-- Sweet Treats
('Desserts All Day', 2),
('Specials', 2),

-- Pizza Heaven
('Lunch Specials', 3),
('Dinner Menu', 3),
('Weekend Special', 3),

-- Sushi World
('Sushi Rolls', 4),
('Sashimi & Nigiri', 4),
('Combo Specials', 4),

-- Healthy Bites
('Healthy Breakfast', 5),
('Low-Calorie Lunch', 5),
('Dinner Bowls', 5);

-- Insert food items
INSERT INTO food (name, description, price, store_id, food_category_id, menu_id)
VALUES 
-- Tasty Bites (Store ID: 1)
('Pancakes', 'Fluffy pancakes with syrup', 8.99, 1, 1, 1),
('Bacon & Eggs', 'Classic breakfast with crispy bacon', 10.50, 1, 1, 1),
('Grilled Chicken Sandwich', 'Grilled chicken with lettuce and tomato', 11.00, 1, 3, 2),
('Steak Dinner', 'Grilled steak with mashed potatoes', 20.00, 1, 3, 3),

-- Sweet Treats (Store ID: 2)
('Cheesecake', 'Creamy cheesecake with berry topping', 6.99, 2, 2, 4),
('Brownie Sundae', 'Warm brownie with ice cream', 7.50, 2, 2, 4),
('Seasonal Fruit Tart', 'Fresh fruit on a light crust', 8.00, 2, 2, 5),

-- Pizza Heaven (Store ID: 3)
('Margherita Pizza', 'Tomato, mozzarella, and basil', 10.99, 3, 4, 6),
('Meat Lovers Pizza', 'Loaded with pepperoni, sausage, and bacon', 13.99, 3, 4, 7),
('Weekend Supreme', 'Special weekend toppings', 15.99, 3, 4, 8),

-- Sushi World (Store ID: 4)
('Spicy Tuna Roll', 'Tuna with spicy mayo', 12.00, 4, 5, 9),
('Salmon Nigiri', 'Fresh salmon on rice', 11.00, 4, 5, 10),
('Sushi Combo', 'Assorted sushi and rolls', 25.00, 4, 5, 11),

-- Healthy Bites (Store ID: 5)
('Avocado Toast', 'Whole grain toast with avocado', 7.50, 5, 6, 12),
('Quinoa Salad', 'Quinoa with mixed greens', 9.00, 5, 6, 13),
('Grilled Veggie Bowl', 'Grilled vegetables with brown rice', 10.50, 5, 6, 14);

-- Insert user cart data
INSERT INTO user_cart (user_id, food_id, item_count, total_price)
VALUES 
(1, 1, 1, 8.99),  -- John ordered Pancakes
(2, 4, 2, 40.00), -- Jane ordered 2 Steak Dinners
(3, 9, 1, 13.99), -- Alice ordered Meat Lovers Pizza
(4, 12, 3, 36.00), -- Bob ordered 3 Spicy Tuna Rolls
(5, 15, 1, 10.50); -- Charlie ordered Grilled Veggie Bowl



