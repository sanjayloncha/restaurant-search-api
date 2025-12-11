# 🍽️ Restaurant Search API

A backend service that allows users to search for restaurants based on dish names with mandatory price range filtering. The API returns the top 10 restaurants where a dish has been ordered the most.

## 🚀 Features

- Search restaurants by dish name
- Filter by mandatory price range (minPrice, maxPrice)
- Returns top 10 restaurants sorted by order count
- Built with Node.js, Express, and MySQL

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd restaurant-search-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=3000
```

4. Seed the database:
```bash
node src/seed/seed.js
```

5. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📊 Database Schema

### Tables

**restaurants**
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR, Restaurant name)
- `city` (VARCHAR, City location)

**dishes**
- `id` (INT, Primary Key, Auto Increment)
- `restaurant_id` (INT, Foreign Key → restaurants.id)
- `name` (VARCHAR, Dish name)
- `price` (DECIMAL, Dish price)

**orders**
- `id` (INT, Primary Key, Auto Increment)
- `dish_id` (INT, Foreign Key → dishes.id)
- `order_date` (TIMESTAMP, Order timestamp)

### Relationships
- One restaurant has many dishes (1:N)
- One dish has many orders (1:N)

## 🔌 API Endpoints

### Search Dishes

**GET** `/search/dishes`

Search for restaurants by dish name with price filtering.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Dish name to search for (partial match supported) |
| minPrice | number | Yes | Minimum price filter |
| maxPrice | number | Yes | Maximum price filter |

**Example Request:**
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Success Response (200 OK):**
```json
{
  "restaurants": [
    {
      "restaurantId": 1,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96
    },
    {
      "restaurantId": 2,
      "restaurantName": "Mumbai Biryani Palace",
      "city": "Mumbai",
      "dishName": "Chicken Biryani",
      "dishPrice": 250,
      "orderCount": 85
    }
  ]
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Missing required parameters. Please provide name, minPrice, and maxPrice"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Internal server error"
}
```

## 🧪 Testing the API

### Using Browser
Navigate to:
```
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Using cURL
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### Using Postman
1. Create a new GET request
2. URL: `http://localhost:3000/search/dishes`
3. Add query parameters:
   - name: biryani
   - minPrice: 150
   - maxPrice: 300

### Test Cases

**Test 1: Search Chicken Biryani (₹150-₹300)**
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300
Expected: Returns 10 restaurants with biryani in price range ₹150-₹300
```

**Test 2: Search Chicken Biryani (₹200-₹250)**
```
GET /search/dishes?name=biryani&minPrice=200&maxPrice=250
Expected: Returns restaurants with biryani priced between ₹200-₹250
```

**Test 3: Search Dosa (₹50-₹150)**
```
GET /search/dishes?name=dosa&minPrice=50&maxPrice=150
Expected: Returns restaurants serving dosa in the specified range
```

**Test 4: Missing Parameters**
```
GET /search/dishes?name=biryani
Expected: 400 Bad Request error
```

## 📁 Project Structure
```
restaurant-search-api/
├── src/
│   ├── controllers/
│   │   └── searchController.js    # Business logic for search
│   ├── routes/
│   │   └── searchRoutes.js        # API route definitions
│   ├── db/
│   │   └── db.js                  # Database connection configuration
│   ├── seed/
│   │   └── seed.js                # Database seeding script
│   └── app.js                     # Main application entry point
├── .env                           # Environment variables (not in git)
├── .gitignore                     # Git ignore file
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

## 🛡️ Error Handling

The API includes comprehensive error handling for:
- ✅ Missing required query parameters
- ✅ Invalid price values (non-numeric)
- ✅ Invalid price range (minPrice > maxPrice)
- ✅ Database connection failures
- ✅ Query execution errors

## 🔒 Environment Variables

Required environment variables in `.env`:
```env
# Database Configuration
DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# Server Configuration
PORT=3000
```
