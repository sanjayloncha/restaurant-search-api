const db = require('../db/db');

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Drop tables if they exist (for fresh start)
        await db.query('DROP TABLE IF EXISTS orders');
        await db.query('DROP TABLE IF EXISTS dishes');
        await db.query('DROP TABLE IF EXISTS restaurants');
        console.log('✅ Old tables dropped');

        // Create restaurants table
        await db.query(`
            CREATE TABLE restaurants (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL
            )
        `);
        console.log('✅ Restaurants table created');

        // Create dishes table
        await db.query(`
            CREATE TABLE dishes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                restaurant_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
            )
        `);
        console.log('✅ Dishes table created');

        // Create orders table
        await db.query(`
            CREATE TABLE orders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                dish_id INT NOT NULL,
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (dish_id) REFERENCES dishes(id)
            )
        `);
        console.log('✅ Orders table created');

        // Insert sample restaurants
        const restaurants = [
            ['Hyderabadi Spice House', 'Hyderabad'],
            ['Mumbai Biryani Palace', 'Mumbai'],
            ['Delhi Darbar', 'Delhi'],
            ['Kolkata Kitchen', 'Kolkata'],
            ['Chennai Chettinad', 'Chennai'],
            ['Bangalore Biryani Hub', 'Bangalore'],
            ['Lucknow Nawabi', 'Lucknow'],
            ['Pune Paradise', 'Pune'],
            ['Jaipur Royal Kitchen', 'Jaipur'],
            ['Ahmedabad Spice Route', 'Ahmedabad']
        ];

        for (const restaurant of restaurants) {
            await db.query('INSERT INTO restaurants (name, city) VALUES (?, ?)', restaurant);
        }
        console.log('✅ Restaurants inserted');

        // Insert sample dishes (including biryani with various prices)
        const dishes = [
            // Restaurant 1 - Hyderabadi Spice House
            [1, 'Chicken Biryani', 220],
            [1, 'Mutton Biryani', 280],
            [1, 'Paneer Tikka', 180],
            
            // Restaurant 2 - Mumbai Biryani Palace
            [2, 'Chicken Biryani', 250],
            [2, 'Veg Biryani', 150],
            [2, 'Fish Curry', 200],
            
            // Restaurant 3 - Delhi Darbar
            [3, 'Chicken Biryani', 190],
            [3, 'Butter Chicken', 240],
            [3, 'Dal Makhani', 160],
            
            // Restaurant 4 - Kolkata Kitchen
            [4, 'Chicken Biryani', 210],
            [4, 'Fish Biryani', 260],
            [4, 'Rosogolla', 80],
            
            // Restaurant 5 - Chennai Chettinad
            [5, 'Chicken Biryani', 230],
            [5, 'Chettinad Chicken', 250],
            [5, 'Dosa', 100],
            
            // Restaurant 6 - Bangalore Biryani Hub
            [6, 'Chicken Biryani', 200],
            [6, 'Mutton Biryani', 290],
            [6, 'Masala Dosa', 120],
            
            // Restaurant 7 - Lucknow Nawabi
            [7, 'Chicken Biryani', 270],
            [7, 'Lucknowi Biryani', 300],
            [7, 'Kebab Platter', 350],
            
            // Restaurant 8 - Pune Paradise
            [8, 'Chicken Biryani', 180],
            [8, 'Veg Biryani', 140],
            [8, 'Misal Pav', 90],
            
            // Restaurant 9 - Jaipur Royal Kitchen
            [9, 'Chicken Biryani', 260],
            [9, 'Laal Maas', 320],
            [9, 'Dal Baati', 180],
            
            // Restaurant 10 - Ahmedabad Spice Route
            [10, 'Chicken Biryani', 240],
            [10, 'Gujarati Thali', 200],
            [10, 'Dhokla', 70]
        ];

        for (const dish of dishes) {
            await db.query('INSERT INTO dishes (restaurant_id, name, price) VALUES (?, ?, ?)', dish);
        }
        console.log('✅ Dishes inserted');

        // Insert sample orders (more orders for popular dishes)
        // Restaurant 1 - 96 orders for Chicken Biryani
        for (let i = 0; i < 96; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [1]);
        }
        
        // Restaurant 2 - 85 orders for Chicken Biryani
        for (let i = 0; i < 85; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [4]);
        }
        
        // Restaurant 3 - 78 orders for Chicken Biryani
        for (let i = 0; i < 78; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [7]);
        }
        
        // Restaurant 4 - 70 orders for Chicken Biryani
        for (let i = 0; i < 70; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [10]);
        }
        
        // Restaurant 5 - 65 orders for Chicken Biryani
        for (let i = 0; i < 65; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [13]);
        }
        
        // Restaurant 6 - 60 orders for Chicken Biryani
        for (let i = 0; i < 60; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [16]);
        }
        
        // Restaurant 7 - 55 orders for Chicken Biryani (price 270, outside 150-300 range if we search 150-250)
        for (let i = 0; i < 55; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [19]);
        }
        
        // Restaurant 8 - 50 orders for Chicken Biryani
        for (let i = 0; i < 50; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [22]);
        }
        
        // Restaurant 9 - 45 orders for Chicken Biryani
        for (let i = 0; i < 45; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [25]);
        }
        
        // Restaurant 10 - 40 orders for Chicken Biryani
        for (let i = 0; i < 40; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [28]);
        }
        
        // Add some orders for other dishes too
        for (let i = 0; i < 30; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [2]); // Mutton Biryani
        }
        for (let i = 0; i < 25; i++) {
            await db.query('INSERT INTO orders (dish_id) VALUES (?)', [5]); // Veg Biryani
        }

        console.log('✅ Orders inserted');
        console.log('✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();