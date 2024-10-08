const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');

app.use(express.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Get all Categories 
app.get('/categories', async (req, res) => {
    try {
        const categories = await db.query('SELECT * FROM categories');
        res.render('categories', { categories: categories.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a specific category by ID
app.get('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await db.query('SELECT * FROM categories WHERE id = $1', [category]);
        const items = await db.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
        res.render('items', { category: category.rows[0], items: items.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create Category
app.post('/categories', async (req, res) => {
    const { name, description } = req.body;
    try {
        await db.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description]);
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Category
app.put('/categories/:id', async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    try {
        await db.query('UPDATE categories SET name = $1, description = $2 WHERE id = $3', [name, description, id]);
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create Item
app.post('/items', async (req, res) => {
    const { name, description, price, quantity, category_id } = req.body;
    try {
        await db.query('INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5)', 
                       [name, description, price, quantity, category_id]);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Item
app.put('/items/:id', async (req, res) => {
    const { name, description, price, quantity, category_id } = req.body;
    const { id } = req.params;
    try {
        await db.query('UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6', 
                       [name, description, price, quantity, category_id, id]);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete Category and Disassociate Items
app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Set cateogry_id to NULL for all items so they don't get deleted with the cateogry
        await db.query('UPDATE items SET category_id = NULL WHERE category_id = $1', [id]);

        await db.query('DELETE FROM categories WHERE id = $1', [id]);

        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete Item
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM items WHERE id = $1', [id]);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});