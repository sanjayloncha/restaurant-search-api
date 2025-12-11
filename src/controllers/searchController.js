const db = require('../db/db');

const searchDishes = async (req, res) => {
    try {
        const { name, minPrice, maxPrice } = req.query;

        // Validate required parameters
        if (!name || !minPrice || !maxPrice) {
            return res.status(400).json({
                error: 'Missing required parameters. Please provide name, minPrice, and maxPrice'
            });
        }

        // Validate price range
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({
                error: 'minPrice and maxPrice must be valid numbers'
            });
        }

        if (min > max) {
            return res.status(400).json({
                error: 'minPrice cannot be greater than maxPrice'
            });
        }

        // Query to get top 10 restaurants by order count for the dish
        const query = `
            SELECT 
                r.id as restaurantId,
                r.name as restaurantName,
                r.city,
                d.name as dishName,
                d.price as dishPrice,
                COUNT(o.id) as orderCount
            FROM restaurants r
            JOIN dishes d ON r.id = d.restaurant_id
            JOIN orders o ON d.id = o.dish_id
            WHERE d.name LIKE ? 
            AND d.price BETWEEN ? AND ?
            GROUP BY r.id, d.id
            ORDER BY orderCount DESC
            LIMIT 10
        `;

        const [results] = await db.query(query, [`%${name}%`, min, max]);

        res.json({
            restaurants: results
        });

    } catch (error) {
        console.error('Error searching dishes:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = { searchDishes };