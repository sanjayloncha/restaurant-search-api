# 🍽️ Restaurant Search API

A backend service that allows users to search for restaurants based on dish names with mandatory price range filtering. The API returns the top 10 restaurants where a dish has been ordered the most.

## 🌐 Live Demo

**API Base URL:** https://restaurant-search-api.onrender.com

**Try it now:**
```
https://restaurant-search-api.onrender.com/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

## 🚀 Features

- Search restaurants by dish name with partial matching
- Mandatory price range filtering (minPrice, maxPrice)
- Returns top 10 restaurants sorted by order count
- Built with Node.js, Express, and MySQL
- Deployed on Render with Railway MySQL database
- RESTful API design with proper error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## 🛠️ Local Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sanjayloncha/restaurant-search-api.git
cd restaurant-search-api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the root directory:**
```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=3000
```

4. **Seed the database:**
```bash
node src/seed/seed.js
```

5. **Start the server:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📊 Database Schema

### Tables Structure

**restaurants**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| city | VARCHAR(100) | NOT NULL |

**dishes**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| restaurant_id | INT | NOT NULL, FOREIGN KEY → restaurants(id) |
| name | VARCHAR(255) | NOT NULL |
| price | DECIMAL(10,2) | NOT NULL |

**orders**
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| dish_id | INT | NOT NULL, FOREIGN KEY → dishes(id) |
| order_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Database Relationships
```
restaurants (1) ──→ (N) dishes (1) ──→ (N) orders
```
- One restaurant can have multiple dishes
- One dish can have multiple orders

## 🔌 API Documentation

### Base URL
- **Production:** `https://restaurant-search-api.onrender.com`
- **Local:** `http://localhost:3000`

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "message": "Restaurant Search API is running ✅"
}
```

#### 2. Search Dishes
```http
GET /search/dishes
```

Search for restaurants by dish name with mandatory price filtering.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | ✅ Yes | Dish name to search (partial match supported) |
| minPrice | number | ✅ Yes | Minimum price filter |
| maxPrice | number | ✅ Yes | Maximum price filter |

**Example Request:**
```bash
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
      "dishPrice": "220.00",
      "orderCount": 96
    },
    {
      "restaurantId": 2,
      "restaurantName": "Mumbai Biryani Palace",
      "city": "Mumbai",
      "dishName": "Chicken Biryani",
      "dishPrice": "250.00",
      "orderCount": 85
    }
  ]
}
```

**Error Responses:**

**400 Bad Request** - Missing parameters:
```json
{
  "error": "Missing required parameters. Please provide name, minPrice, and maxPrice"
}
```

**400 Bad Request** - Invalid price values:
```json
{
  "error": "minPrice and maxPrice must be valid numbers"
}
```

**400 Bad Request** - Invalid price range:
```json
{
  "error": "minPrice cannot be greater than maxPrice"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## 🧪 Testing the API

### Using Browser
Navigate to:
```
https://restaurant-search-api.onrender.com/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Using cURL
```bash
curl "https://restaurant-search-api.onrender.com/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### Using JavaScript (Fetch)
```javascript
fetch('https://restaurant-search-api.onrender.com/search/dishes?name=biryani&minPrice=150&maxPrice=300')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Postman
1. Create a new GET request
2. URL: `https://restaurant-search-api.onrender.com/search/dishes`
3. Add query parameters:
   - `name`: biryani
   - `minPrice`: 150
   - `maxPrice`: 300
4. Send request

### Test Cases

**Test 1: Search Chicken Biryani (₹150-₹300)**
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300
```
✅ Expected: Returns 10 restaurants with biryani in price range ₹150-₹300

**Test 2: Search Chicken Biryani (₹200-₹250)**
```
GET /search/dishes?name=biryani&minPrice=200&maxPrice=250
```
✅ Expected: Returns restaurants with biryani priced between ₹200-₹250

**Test 3: Search Dosa (₹50-₹150)**
```
GET /search/dishes?name=dosa&minPrice=50&maxPrice=150
```
✅ Expected: Returns restaurants serving dosa in the specified range

**Test 4: Missing Parameters**
```
GET /search/dishes?name=biryani
```
❌ Expected: 400 Bad Request error

**Test 5: Invalid Price Range**
```
GET /search/dishes?name=biryani&minPrice=300&maxPrice=150
```
❌ Expected: 400 Bad Request error

## 📁 Project Structure

```
restaurant-search-api/
├── src/
│   ├── controllers/
│   │   └── searchController.js    # Business logic for search API
│   ├── routes/
│   │   └── searchRoutes.js        # API route definitions
│   ├── db/
│   │   └── db.js                  # Database connection pool
│   ├── seed/
│   │   └── seed.js                # Database seeding script
│   └── app.js                     # Express app entry point
├── .env                           # Environment variables (not in git)
├── .gitignore                     # Git ignore file
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

## 🗃️ Sample Data

The seed file populates the database with:
- **10 restaurants** across major Indian cities
- **30+ dishes** including various biryanis, curries, and regional specialties
- **644+ orders** distributed realistically across dishes

### Top Restaurants by Chicken Biryani Orders:
1. 🥇 Hyderabadi Spice House (Hyderabad) - 96 orders - ₹220
2. 🥈 Mumbai Biryani Palace (Mumbai) - 85 orders - ₹250
3. 🥉 Delhi Darbar (Delhi) - 78 orders - ₹190
4. Kolkata Kitchen (Kolkata) - 70 orders - ₹210
5. Chennai Chettinad (Chennai) - 65 orders - ₹230
6. Bangalore Biryani Hub (Bangalore) - 60 orders - ₹200
7. Lucknow Nawabi (Lucknow) - 55 orders - ₹270
8. Pune Paradise (Pune) - 50 orders - ₹180
9. Jaipur Royal Kitchen (Jaipur) - 45 orders - ₹260
10. Ahmedabad Spice Route (Ahmedabad) - 40 orders - ₹240

## 🛡️ Error Handling

The API includes comprehensive validation and error handling:

✅ **Input Validation**
- Missing required query parameters
- Invalid numeric values for prices
- Invalid price range (minPrice > maxPrice)

✅ **Database Error Handling**
- Connection failures
- Query execution errors
- Graceful error responses

✅ **Response Formatting**
- Consistent JSON structure
- Appropriate HTTP status codes
- Clear error messages

## 🔒 Environment Variables

Required environment variables:

```env
# Database Configuration (Railway MySQL)
DB_HOST=nozomi.proxy.rlwy.net
DB_PORT=21736
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=railway

# Server Configuration
PORT=3000
```

**⚠️ Security Note:** 
- Never commit `.env` file to version control
- Use environment variables in production
- `.env` is already in `.gitignore`

## 🚀 Deployment

### Current Deployment
- **Platform:** Render
- **Database:** Railway MySQL
- **URL:** https://restaurant-search-api.onrender.com

### Deployment Steps (Render)

1. **Connect GitHub Repository**
   - Create new Web Service on Render
   - Connect your GitHub repo

2. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   - Add all variables from `.env` file
   - Use Railway MySQL credentials

4. **Deploy**
   - Render will automatically build and deploy
   - First deployment may take 2-3 minutes

### Alternative Platforms
The application can also be deployed on:
- Railway
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Google Cloud Run

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

**Production Dependencies:**
- **express** - Fast, minimalist web framework
- **mysql2** - MySQL client with promise support
- **dotenv** - Load environment variables from .env
- **cors** - Enable Cross-Origin Resource Sharing

**Development Dependencies:**
- **nodemon** - Auto-restart server on file changes

## 🎯 Key Features Implementation

### 1. Efficient Query Design
```sql
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
```

### 2. Connection Pooling
Uses MySQL connection pool for better performance and resource management.

### 3. Partial Name Matching
Supports flexible search with LIKE query (e.g., "biryani" matches "Chicken Biryani").

### 4. Price Range Filtering
Mandatory price filtering ensures relevant results within budget.

## 📈 Performance Considerations

- **Database Indexing:** Consider adding indexes on frequently queried columns
- **Connection Pooling:** Configured with 10 concurrent connections
- **Query Optimization:** Single optimized JOIN query for efficient data retrieval
- **Error Handling:** Prevents database connection leaks

## 🔄 Future Enhancements

Potential improvements for future versions:
- [ ] Pagination support for results beyond top 10
- [ ] Additional filters (cuisine type, rating, distance)
- [ ] Caching layer (Redis) for frequently searched queries
- [ ] Authentication and rate limiting
- [ ] Advanced search with multiple dish names
- [ ] Sorting options (price, distance, rating)
- [ ] Geolocation-based restaurant filtering

## 📝 Assignment Notes

**Project Requirements Met:**
- ✅ Clean Node.js + MySQL backend code
- ✅ Clear README with setup steps and examples
- ✅ Seed file with comprehensive sample data
- ✅ Hosted on free platform (Render)
- ✅ Code pushed to public GitHub repository
- ✅ Functional API with proper error handling
- ✅ Single API endpoint as required
- ✅ Top 10 restaurants by order count
- ✅ Mandatory price range filtering

**Technical Stack:**
- Backend: Node.js + Express.js
- Database: MySQL (Railway)
- Hosting: Render
- Version Control: Git + GitHub

---

**⭐ Made with dedication for Backend Development Assignment**

**Live API:** https://restaurant-search-api.onrender.com
