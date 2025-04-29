const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

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
app.get('/tables', (req, res) => {
    connection.query('SHOW TABLES', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
        console.log(results);
        res.json(results);
    });
});

app.get('/api/meal-plans', (req, res) => {
    // Query your database for meal plans
    connection.query('SELECT * FROM MealPlans', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.get('/api/recipes', (req, res) => {
    // Query your database for recipes
    connection.query('SELECT * FROM Recipes', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.get('/api/meal-plans/:id', (req, res) => {
    connection.query('SELECT * FROM MealPlans WHERE MealPlanID = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.length === 0) return res.status(404).json({ error: 'Meal plan not found' });
        res.json(results[0]);
    });
});

app.get('/api/recipes/:id', (req, res) => {
    connection.query('SELECT * FROM Recipes WHERE RecipeID = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.length === 0) return res.status(404).json({ error: 'Recipe not found' });
        res.json(results[0]);
    });
});

app.post('/api/meal-plans', (req, res) => {
    const { UserID, Title, StartDate, EndDate, CaloriesTarget, ProteinTarget, CarbsTarget, FatTarget, Notes } = req.body;

    connection.query(
        'INSERT INTO MealPlans (UserID, Title, StartDate, EndDate, CaloriesTarget, ProteinTarget, CarbsTarget, FatTarget, Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [UserID, Title, StartDate, EndDate, CaloriesTarget, ProteinTarget, CarbsTarget, FatTarget, Notes],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    );
});

app.post('/api/recipes', (req, res) => {
    const { name, description, totalTime, servings, calories, protein, carbs, fat, instructions } = req.body;

    connection.query(
        'INSERT INTO Recipes (RecipeName, Description, TotalTime, Servings, Calories, Protein, Carbs, Fat, Instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, totalTime, servings, calories, protein, carbs, fat, instructions],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    );
});

app.delete('/api/meal-plans/:id', (req, res) => {
    connection.query('DELETE FROM MealPlans WHERE MealPlanID = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Meal plan not found' });
        res.status(200).json({ message: 'Meal plan deleted successfully' });
    });
});

app.delete('/api/recipes/:id', (req, res) => {
    connection.query('DELETE FROM Recipes WHERE RecipeID = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Recipe not found' });
        res.status(200).json({ message: 'Recipe deleted successfully' });
    });
});

// Get all meals for a specific date
app.get('/api/meals', (req, res) => {
    const { date, userId } = req.query;

    let query = 'SELECT * FROM Meals WHERE UserID = ?';
    let params = [userId || 1]; // Default to user 1 until auth is implemented

    if (date) {
        query += ' AND MealDate = ?';
        params.push(date);
    }

    connection.query(query, params, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

// Get a single meal by ID
app.get('/api/meals/:id', (req, res) => {
    connection.query('SELECT * FROM Meals WHERE MealID = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.length === 0) return res.status(404).json({ error: 'Meal not found' });
        res.json(results[0]);
    });
});

// Add a new meal
app.post('/api/meals', (req, res) => {
    const {
        UserID,
        MealPlanID,
        RecipeID,
        MealType,
        MealName,
        MealDate,
        Servings,
        Calories,
        Protein,
        Carbs,
        Fat,
        Notes
    } = req.body;

    connection.query(
        'INSERT INTO Meals (UserID, MealPlanID, RecipeID, MealType, MealName, MealDate, Servings, Calories, Protein, Carbs, Fat, Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [UserID || 1, MealPlanID, RecipeID, MealType, MealName, MealDate, Servings, Calories, Protein, Carbs, Fat, Notes],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    );
});

// Update a meal
app.put('/api/meals/:id', (req, res) => {
    const {
        MealType,
        MealName,
        MealDate,
        Servings,
        Calories,
        Protein,
        Carbs,
        Fat,
        Notes
    } = req.body;

    connection.query(
        'UPDATE Meals SET MealType = ?, MealName = ?, MealDate = ?, Servings = ?, Calories = ?, Protein = ?, Carbs = ?, Fat = ?, Notes = ? WHERE MealID = ?',
        [MealType, MealName, MealDate, Servings, Calories, Protein, Carbs, Fat, Notes, req.params.id],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Meal not found' });
            res.json({ id: req.params.id, ...req.body });
        }
    );
});

// Delete a meal
app.delete('/api/meals/:id', (req, res) => {
    connection.query('DELETE FROM Meals WHERE MealID = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Meal not found' });
        res.status(200).json({ message: 'Meal deleted successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});