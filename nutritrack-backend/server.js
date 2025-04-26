const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'cmsc-vcu.com',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'sp25_static_duo',
    port: process.env.DB_PORT || 3306
});

// Connect to MySQL
connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        return;
    }
    console.log('Successfully connected to MySQL database');
});

// Example API endpoint
app.get('/api/data', (req, res) => {
    connection.query('SHOW TABLES', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});